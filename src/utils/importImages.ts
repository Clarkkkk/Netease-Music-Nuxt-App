import { convertKeyStyle } from './convertKeyStyle'

type SvgReactComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>

export interface ImageSetItem {
    alt: string;
    src: string;
    srcSet: string;
    webpSrc?: string;
    webpSrcSet?: string;
    SvgComponent?: SvgReactComponent;
}

export interface ImageSet {
    [prop: string]: ImageSetItem;
}

/**
 * **批量导入切图，使用方法：**
 *
 * 如导入`./assets`中的`btn_share.png`, `btn_share@2x.png`, `btn_share@3x.png`
 *
 * 在`./assets/index.ts`中，
 * ```
 * import { importImages } from 'tools'
 * export const { btnShare } = importImages(import.meta.globEager('./*')) // 传入图片所在目录
 * ```
 *
 * 在`./components/share.tsx`中，
 * ```
 * import { btnShare } from '../assets'
 * import { Image } from 'components'
 * const img = <Image {...btnShare} />
 * ```
 */
export function importImages(module: Record<string, {
    [key: string]: any;
}>) {
    const result = {} as ImageSet
    const regExp = /(\.\/)(.*?)(@\dx)?(\.(jpe?g|png|gif|svg|webp)$)/i

    const keys = Object.keys(module)
    // resourcePath的格式形如`./xxx.ext`
    for (const resourcePath of keys) {
        const key = getFileName(resourcePath)
        const density = getDensity(resourcePath)
        const outputPath = getModuleString(resourcePath)

        // 跳过不匹配正则的文件
        if (!key) continue

        if (!result[key]) {
            result[key] = {
                alt: key,
                src: '',
                srcSet: '',
                webpSrc: '',
                webpSrcSet: ''
            }
        }

        // srcset的条目间需添加`,`，默认没有倍数的图为1倍图，
        if (!isSvg(resourcePath)) {
            if (isWebp(resourcePath)) {
                result[key].webpSrcSet += `${result[key].webpSrcSet ? ', ' : ''}${outputPath} ${density || '1x'}`
            } else {
                result[key].srcSet += `${result[key].srcSet ? ', ' : ''}${outputPath} ${density || '1x'}`
            }
        } else {
            // svg转化为react组件
            result[key].SvgComponent = getModuleComponent(resourcePath)
        }

        if (!density) {
            if (isWebp(resourcePath)) {
                result[key].webpSrc = `${outputPath}`
            } else {
                result[key].src = `${outputPath}`
            }
        }
    }

    /** 如果图片被转换为模块，返回路径字符串；如果图片被内联为base64，返回base64字符串 */
    function getModuleString(path: string): string {
        return module[path].default
    }

    /** 获取svg的react组件 */
    function getModuleComponent(path: string): SvgReactComponent {
        return module[path].ReactComponent
    }

    /** 获取文件名 */
    function getFileName(path: string): string {
        return path.match(regExp)?.[2] ?? ''
    }

    /** 获取倍数字符串，如`2x` */
    function getDensity(path: string): string {
        const densityStr = path.match(regExp)?.[3] ?? ''
        return densityStr.match(/\dx/i)?.[0]?.toLowerCase() ?? ''
    }

    /** 是否为svg */
    function isSvg(path: string): boolean {
        return /\.svg$/i.test(path)
    }

    /** 是否为webp */
    function isWebp(path: string): boolean {
        return /\.webp$/i.test(path)
    }

    /** 获取不存在的图片时将会报错 */
    function wrapProxy(obj: ImageSet): ImageSet {
        return new Proxy(obj, {
            get(target: ImageSet, prop: string) {
                if (target[prop] !== undefined) {
                    return target[prop]
                } else {
                    // 属性不存在时抛出错误，以防输错属性名
                    throw new Error(`importImages: Property ${prop} is undefined. Please check your typing.`)
                }
            }
        })
    }

    return wrapProxy(convertKeyStyle(result, 'camel', true))
}
