import { Tags, ParsedTag, FilterTag, FilteredTag } from './types'

/**
 * Adjust tags for easier usage.
 * @param {Tags[]} tags
 * @returns {FilteredTag}
 */
const filterTag: FilterTag = (tags) => {
    let artist = ''
    let language = ''

    const parsedTag: ParsedTag[] = []

    const { parse } = JSON

    tags.filter((tag) => {
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
                if (name === 'translated') return
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

    return {
            artist,
            tags: parsedTag,
            language
        }
}

export { Tags, ParsedTag, FilteredTag }
export default filterTag
