import { readFile, writeFile } from 'fs/promises'
import lodash from 'lodash'
const { camelCase } = lodash;

(async () => {
    const file = await readFile('C:\\Users\\iouio\\Workspace\\Netease-Music-App\\scripts\\doc.md', { encoding: 'utf8' })
    const api = []
    const fileArr = file.split('---divider---')
    for (const part of fileArr) {
        const lines = part.split('\n')
        const apiComment = lines.find((item) => /^### /.test(item)).match(/^### (.*)/)?.[1]
        const addrLine = lines.find((item) => item.includes('接口地址'))
        if (addrLine) {
            const addr = addrLine.match(/`(.+)`/)?.[1]
            const apiName = convertApiName(`Api${addr}`)
            const paramsIndex = lines.findIndex((item) => item.includes('必选参数'))
            const paramsArr = []
            for (const line of lines.slice(paramsIndex + 1)) {
                if (/^`.+`:/.test(line)) {
                    paramsArr.push({
                        key: camelCase(line.match(/^`([^`]+)`/)[1]),
                        type: 'any',
                        optional: false,
                        comment: line.match(/^`[^`]+`: ?(.*)/)?.[1] || ''
                    })
                } else {
                    break
                }
            }

            const optionalParamsIndex = lines.findIndex((item) => item.includes('可选参数'))
            const optionalParamsArr = []
            for (const line of lines.slice(optionalParamsIndex + 1)) {
                if (/^`.+`:/.test(line)) {
                    optionalParamsArr.push({
                        key: camelCase(line.match(/^`([^`]+)`/)[1]),
                        type: 'any',
                        optional: false,
                        comment: line.match(/^`[^`]+`: ?(.*)/)?.[1] || ''
                    })
                } else {
                    break
                }
            }

            const allParamsArr = [
                ...paramsArr,
                ...optionalParamsArr
            ]
            if (allParamsArr.length) {
                api.push({
                    apiComment,
                    interface: apiName,
                    api: addr,
                    method: 'post',
                    params: allParamsArr,
                    return: 'Response'
                })
            } else {
                api.push({
                    apiComment,
                    interface: apiName,
                    api: addr,
                    method: 'post',
                    return: 'Response'
                })
            }
        } else {
            console.log('url not existed')
            console.log(part)
        }
    }

    let indexContent = ''
    for (const item of api) {
        indexContent += `export * from './${item.interface}'\n`
        let content = ''
        if (item.params) {
            function getParamItem(param) {
                return `        ${param.comment ? '/** ' + param.comment + ' */' : ''}\n        ${param.key}${param.optional ? '?' : ''}: ${param.type};`
            }
            content = `/** ${item.apiComment} */
export interface ${item.interface} {
    api: '${item.api}',
    method: 'post',
    params: {
${item.params.map(getParamItem).join('\n')}
    }
    return: ApiResponse;
}
`
        } else {
            content = `/** ${item.apiComment} */
export interface ${item.interface} {
    api: '${item.api}',
    method: 'post',
    return: ApiResponse;
}
`
        }

        writeFile(`C:\\Users\\iouio\\Workspace\\Netease-Music-App\\src\\api\\${item.interface}.ts`, content, { encoding: 'utf8' })
    }
    writeFile('C:\\Users\\iouio\\Workspace\\Netease-Music-App\\src\\api\\index.ts', indexContent, { encoding: 'utf8' })

    function convertApiName(original) {
        return original
            .replaceAll('/', '_')
            .split('_')
            .map((item) => capitalizeFirstLetter(item))
            .join('')
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
})()
