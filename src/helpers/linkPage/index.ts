import {
    LinkPage,
    ImageData,
    ImageCollection,
    PageData,
    LinkedPage,
} from './types'

/**
 * Adjust image for easier usage
 * @param {PageData} pageData
 * @returns {LinkedPage} Parsed page's data
 */
const linkPage: LinkPage = ({ page, media_id, atPage, prefix = 'i' }) => {
    const { t, w, h } = page
    const type = {
        j: 'jpg',
        p: 'png',
        g: 'gif',
    }

    return JSON.parse(`{
        "link": "https://${prefix}.nhentai.net/galleries/${media_id}/${atPage}.${type[t]}",
        "info": {
            "type": "${type[t]}",
            "width": ${w},
            "height": ${h}
        }
    }`)
}

export { ImageData, ImageCollection, PageData, LinkedPage }
export default linkPage
