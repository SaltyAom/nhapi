import { LinkedPage, ImageCollection } from 'src/helpers/linkPage'

/**
 * Link Image's function options.
 * @typedef LinkImageOptions
 * @property {boolean} includePages Include normal pages
 */
export interface LinkImageOptions {
    includePages: boolean
}

export interface LinkedImage {
    pages: LinkedPage[]
    cover: LinkedPage
}

export type LinkImage = (
    images: ImageCollection,
    // tslint:disable-next-line: variable-name
    media_id: number,
    options: LinkImageOptions,
) => LinkedImage