import { LinkedImage, FilteredTag, ImageCollection, Tags } from 'src/helpers'

export interface Data {
    id: string
    media_id: number
    title: {
        pretty: string
        english: string
        japanese: string
    }
    images: ImageCollection
    scanlator: string
    upload_date: number
    tags: Tags[]
    num_pages: number
    num_favorites: number
}

export interface DataError {
    error: boolean
}

export type DataDto = Data | DataError

export interface ParsedDataDto {
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
            original: string
            parse: string
        }
    }
    metadata: FilteredTag
}