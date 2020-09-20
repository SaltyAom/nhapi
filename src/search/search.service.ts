import {
    Injectable,
    HttpService,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common'
import { Observable } from 'rxjs'

import { AxiosResponse } from 'axios'

import { map, catchError } from 'rxjs/operators'

import { SearchDto, ParsedSearchDto } from './search.dto'

import { sanitize, linkImage, filterTag } from 'src/helpers'

@Injectable()
export default class SearchService {
    constructor(private readonly httpService: HttpService) {}

    getHello() {
        throw new BadRequestException(':tag required a value')
    }

    getSearch(search: string, page: number = 1): Observable<ParsedSearchDto[]> {
        return this.httpService
            .get(
                `https://nhentai.net/api/galleries/search?query=${search}&page=${page}`,
            )
            .pipe(
                catchError(() => {
                    throw new NotFoundException('')
                }),
                map((response: AxiosResponse<SearchDto>) => response.data),
                map((data) => {
                    if (!data.result.length)
                        throw new NotFoundException(`${search} not found`)

                    return this.parseSearch(data)
                }),
            )
    }

    private parseSearch(data: SearchDto): ParsedSearchDto[] {
        const related: ParsedSearchDto[] = []

        data.result.map(
            ({
                id,
                title: { pretty, english, japanese },
                media_id,
                images,
                num_pages,
                num_favorites,
                upload_date,
                tags,
            }) => {
                return related.push(
                    JSON.parse(`{
                        "id": ${id},
                        "title": {
                            "display": "${sanitize(pretty)}",
                            "english": "${sanitize(english)}",
                            "japanese": "${sanitize(japanese)}"
                        },
                        "images": ${JSON.stringify(
                            linkImage(images, media_id, {
                                includePages: false,
                            }),
                        )},
                        "info": {
                            "amount": ${num_pages},
                            "favorite": ${num_favorites},
                            "upload": {
                                "original": ${upload_date},
                                "parsed": "${new Date(
                                    parseInt(`${upload_date}000`, 10),
                                ).toLocaleDateString('en-US')}"
                            }
                        },
                        "metadata": ${JSON.stringify(filterTag(tags))}
                    }`),
                )
            },
        )

        return related
    }
}
