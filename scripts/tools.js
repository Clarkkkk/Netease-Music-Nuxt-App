const shelljs = require('shelljs')

/**
 * 是否输入了某指令
 * @param {string} directiveName 指令名称
 * @returns boolean
 */
function hasDirective(directiveName) {
    if (process.env.npm_config_argv) {
        const npmConfigArgv = JSON.parse(process.env.npm_config_argv).original
        return !!(npmConfigArgv.includes(`--${directiveName}`))
    } else {
        return process.env[`npm_config_${directiveName}`]
    }
}

/** 获取当前git分支名 */
function getBranchName() {
    return shelljs
        .exec('git symbolic-ref --short -q HEAD', { silent: true })
        .stdout
        .replace(/[\r\n]/g, '')
}

/** 获取当前未暂存的图片改动 */
function getUnstagedImgArr() {
    const statusArr = shelljs.exec('git status -s', { silent: true }).toString().replace(/\n$/, '').split('\n')
    const unstagedImgArr = statusArr.filter((item) => {
        return (item[0] === ' ' || item[0] === '?')
            && /\.(png|jpg|jpeg|svg|webp)$/i.test(item)
    }).map((item) => item.slice(3))
    return unstagedImgArr
}

module.exports = {
    hasDirective,
    getBranchName,
    getUnstagedImgArr
}
