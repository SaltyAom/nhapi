import linkPage from 'src/helpers/linkPage'

import {
    LinkImage,
    LinkImageOptions,
    LinkedImage,
} from './types'

/**
 * Adjust image for easier usage
 * @param {ImageCollection} images
 * @param {(string|number)} media_id
 * @param {LinkImageOptions} options
 */
// tslint:disable-next-line: variable-name
const linkImage: LinkImage = (images, media_id, options) => {
    const { pages, cover } = images
    const parsed: LinkedImage = {
        pages: [],
        cover: linkPage({
            page: cover,
            media_id,
            atPage: 'cover',
            prefix: 't',
        })
    }

    const { includePages } = options

    if (includePages)
        pages.map((page, index) =>
            parsed.pages.push(
                linkPage({
                    page,
                    media_id,
                    atPage: index + 1,
                }),
            ),
        )

    return parsed
}

export { LinkImageOptions, LinkedImage }
export default linkImage
