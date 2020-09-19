import { LinkedImage, FilteredTag, ImageCollection, Tags } from 'src/helpers'

export interface RelatedDto {
    result: {
        id: string
        title: {
            pretty: string
            english: string
            japanese: string
        }
        media_id: number
        images: ImageCollection
        num_pages: number
        num_favorites: number
        upload_date: number
        tags: Tags[]
    }[]
    num_pages: number
    per_page: number
}

export interface ParsedRelatedDto {
    id: number
    title: {
        display: string
        english: string
        japanese: string
    }
    images: LinkedImage
    info: {
        amount: number
        favorite: number
        upload: {
            original: number
            parsed: string
        }
    }
    metadata: FilteredTag
}