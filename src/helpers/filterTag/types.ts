/**
 * @typedef Tags Tag's structure
 * @type {object}
 * @property {string} url
 * @property {number} count
 * @property {string} type
 * @property {number} id
 * @property {string} name
 */
export interface Tags {
    type: 'artist' | 'group' | 'language' | 'tag' | string
    name: string
    url: string
    count: number
    id: number
}

/**
 * @typedef ParsedTag Parsed tag's metadata
 * @type {object}
 * @property {string} name
 * @property {number} count
 * @property {string} url
 */
export interface ParsedTag {
    name: string
    count: number
    url: string
}

/**
 * @typedef FilteredTag Filtered tags' data
 * @type {object}
 * @property {ParsedTag} artist Artist's data
 * @property {ParsedTag[]} tags Parsed tags' metadata
 * @property {(string | null)} language Displayed language - Return null on undefined
 */
export interface FilteredTag {
    artist: string
    tags: ParsedTag[]
    language: string | null
}

export type FilterTag = (tag: Tags[]) => FilteredTag