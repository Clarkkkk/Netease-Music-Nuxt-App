import imagemin from 'imagemin'
import imageminSvgo from 'imagemin-svgo'
import { ImagePool } from '@squoosh/lib'
import { globby } from 'globby'
import { cpus } from 'os'
import { writeFile, readFile } from 'fs/promises'
import shell from 'shelljs'
import { hasDirective, getUnstagedImgArr } from './tools.js';

/**
 * 图片压缩脚本
 * 此脚本用于压缩图片，已经包含在prebuild中，运行`npm run build`时会自动运行
 * 也可以直接运行`npm run compress`来压缩src下的所有图片（压缩过的图片不会再次压缩）
 * 此外，运行`npm run compress --dir=src/xx/xxx`可以指定压缩文件路径
 * 指定路径时，会忽略压缩历史，仅用于替换了图片，但图片文件名不变的情况
 * 压缩png和jpg文件时，会同时生成相应的webp文件
 */
(async () => {
    const start = Date.now()

    // 开始前先将所有改动添加到暂存区
    const unstaged = getUnstagedImgArr()
    unstaged.length && shell.exec(`git add ${unstaged.join(' ')}`)

    // 初始化压缩历史记录
    let compressHistory
    try {
        const compressHistoryStr = await readFile('compress-history.json', { encoding: 'utf8' })
        compressHistory = JSON.parse(compressHistoryStr) || {}
    } catch (e) {
        await writeFile('compress-history.json', '{"trailing": true}')
        compressHistory = { trailing: true }
    }

    // 默认压缩common,modules,pages目录下的所有图片
    let directory = ['common', 'modules', 'pages']
    const specifiedDirectory = hasDirective('dir')
    // 获取git暂存区中状态为R（即重命名）的所有文件路径，筛选出图片文件放入数组
    const nameStatus = shell.exec('git diff --staged --diff-filter=R -M --name-status ./', { silent: true })
    const renamedItemArr = nameStatus.replace(/\n$/, '').split('\n').filter((item) => /\.(png|jpg|jpeg|svg|webp)$/i.test(item))

    if (specifiedDirectory) {
        // 如果显式声明了目录，则压缩该目录下的文件
        directory = specifiedDirectory
    }

    // 跳过只重命名或只移动位置的图片，并更新compressHistory
    for (const renamedItem of renamedItemArr) {
        const strArr = renamedItem.split('\t')
        if (strArr[0] !== 'R100') continue
        const previous = strArr[1]
        const now = strArr[2]
        if (compressHistory[previous]) {
            compressHistory[now] = true
            delete compressHistory[previous]
        }
    }

    // 获取所有图片路径
    const paths = await globby(directory, {
        expandDirectories: {
            extensions: ['jpg', 'jpeg', 'svg', 'png', 'webp']
        }
    })
    const currentPathsObj = {}
    const imagePool = new ImagePool(cpus().length)
    const promises = paths.map(async (path) => {
        currentPathsObj[path] = true

        // 如果没有显式声明路径，则跳过已经压缩的图片；否则无视压缩历史，压缩指定路径下的所有图片
        if (compressHistory[path] && !specifiedDirectory) return

        compressHistory[path] = true

        const originalBuffer = await readFile(path)
        // svg使用svgo压缩，其余格式使用squoosh压缩
        if (/\.svg$/i.test(path)) {
            const [minObj] = await imagemin([path], {
                plugins: [
                    imageminSvgo({
                        plugins: [{
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    convertColors: {
                                        currentColor: true
                                    },
                                    removeViewBox: false
                                }
                            }
                        }]
                    })
                ]
            })
            return writeFile(path, minObj.data)
        } else {
            const image = imagePool.ingestImage(originalBuffer)
            let webpPath = ''
            if (/\.png$/i.test(path)) {
                await image.encode({
                    oxipng: {
                        level: 2
                    },
                    webp: {
                        quality: 90
                    }
                })
                webpPath = path.replace(/\.png$/i, '.webp')
                // 自动生成的webp无需再次压缩
                compressHistory[webpPath] = 'auto'
            } else if (/\.jpe?g/i.test(path)) {
                await image.encode({
                    mozjpeg: {
                        quality: 90
                    },
                    webp: {
                        quality: 90
                    }
                })
                webpPath = path.replace(/\.jpe?g$/i, '.webp')
                // 自动生成的webp无需再次压缩
                compressHistory[webpPath] = 'auto'
            } else if (/\.webp/i.test(path)) {
                await image.encode({
                    webp: {
                        quality: 90
                    }
                })
            }
            const writeFileTasks = Object.values(image.encodedWith).map(async (task) => {
                return task.then((data) => {
                    return writeFile((data.extension === 'webp' && webpPath) ? webpPath : path, data.binary)
                })
            })
            return Promise.all(writeFileTasks)
        }
    })
    await Promise.all(promises)
    imagePool.close()

    // 清除已删除图片的路径
    if (!specifiedDirectory) {
        for (const key of Object.keys(compressHistory)) {
            // 跳过刚刚生成的webp图片
            if (compressHistory[key] === 'auto') {
                compressHistory[key] = true
                continue
            }

            if (!currentPathsObj[key]) {
                delete compressHistory[key]
            }
        }
    }

    // 先删除trailing，再添加，保证它在最后一行
    delete compressHistory.trailing
    if (Object.keys(compressHistory).length > 0) {
        // 格式化为多行，并在最后一行添加trailing，方便git识别变化
        const compressHistoryStr =
            JSON.stringify(compressHistory)
                .replaceAll(':', ': ')
                .replaceAll(',', ',\n    ')
                .replace('{', '{\n    ')
                .replace('}', ',\n    "trailing": true\n}\n')

        await writeFile('compress-history.json', compressHistoryStr)
    }

    // 将所有改动添加到暂存区
    const changed = getUnstagedImgArr()
    changed.length && shell.exec(`git add ${changed.join(' ')}`)

    const end = Date.now()
    console.log(`图片压缩完成，耗时 ${((end - start) / 1000).toFixed(1)} 秒`)
    process.exit()
})()
