import { Tags, ParsedTag, FilterTag, FilteredTag } from './types'

/**
 * Adjust tags for easier usage.
 * @param {Tags[]} tags
 * @returns {FilteredTag}
 */
const filterTag: FilterTag = tags => {
    let artist: string = ''
    let language: string = ''

    const parsedTag: FilteredTag[] = []

    const { parse } = JSON

    tags.filter(tag => {
        const { type = '', name = '', url = '', count = 0 } = tag

        switch (type) {
            case 'artist':
            case 'group':
                return (artist = parse(`{
                        "name": "${name}",
                        "count": ${count},
                        "url": "https://nhentai.net${url}"
                    }`))

            case 'language':
                return (language = name)

            case 'tag':
                return parsedTag.push(
                    parse(`{
                            "name": "${name}",
                            "count": ${count},
                            "url": "https://nhentai.net${url}"
                        }`),
                )

            default:
                break
        }
    })

    return parse(`{
            "artist": ${JSON.stringify(artist)},
            "tags": ${JSON.stringify(parsedTag)},
            "language": "${language}"
        }`)
}

export { Tags, ParsedTag, FilteredTag }
export default filterTag
