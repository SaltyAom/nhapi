/**
 * Image's data
 * @typedef ImageData Image's inner data
 * @type {object}
 * @property {string} t Image's type
 * @property {number} w Image's width
 * @property {number} h Image's height
 */
export interface ImageData {
    t: 'p' | 'j' | 'g' | string
    w: number
    h: number
}

export interface ParsedImageData {
    type: 'jpg' | 'png' | 'gif' | string
    width: number
    height: number
}

/**
 * Required property of 'images'
 * @typedef ImageCollection - Collection of image's data
 * @type {object}
 * @property {ImageData[]} pages
 * @property {ImageData} cover
 */
export interface ImageCollection {
    cover: ImageData
    pages: ImageData[]
}

/**
 * Parameter's structure.
 * @typedef PageData
 * @type {object}
 * @property {ImageData} page
 * @property {number} media_id
 * @property {(string|number)} atPage Specify page's number
 * @property {string} prefix Subdomain's prefix
 */
export interface PageData {
    page: ImageData
    media_id: number
    atPage: string | number
    prefix?: string
}

/**
 * @typedef LinkedPage
 * @type {object}
 * @property {string} link Parsed link
 * @property {ParsedInfo} info Parsed Info
 */
export interface LinkedPage {
    link: string
    info: ParsedImageData
}

export type LinkPage = (pageData: PageData) => LinkedPage
