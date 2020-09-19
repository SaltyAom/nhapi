import {
    Injectable,
    HttpService,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common'
import { Observable } from 'rxjs'

import { AxiosResponse } from 'axios'

import { map, catchError } from 'rxjs/operators'

import { Data, DataDto, ParsedDataDto } from './data.dto'
import { RelatedDto, ParsedRelatedDto } from './related.dto'

import { sanitize, linkImage, filterTag } from 'src/helpers'

@Injectable()
export default class DataService {
    constructor(private readonly httpService: HttpService) {}

    getIndex() {
        throw new BadRequestException(':id required a value')
    }

    getData(id: string): Observable<ParsedDataDto> {
        return this.httpService
            .get(`https://nhentai.net/api/gallery/${id}`)
            .pipe(
                catchError(() => {
                    throw new NotFoundException('')
                }),
                map((response: AxiosResponse<DataDto>) => response.data),
                map(data => {
                    if ('error' in data)
                        throw new NotFoundException(`${id} not found`)

                    return this.parseData(data)
                }),
            )
    }

    getRelate(id: string): Observable<ParsedRelatedDto[]> {
        return this.httpService
            .get(`https://nhentai.net/api/gallery/${id}/related`)
            .pipe(
                catchError(() => {
                    throw new NotFoundException('')
                }),
                map((response: AxiosResponse<RelatedDto>) => response.data),
                map(data => {
                    if ('error' in data)
                        throw new NotFoundException(`${id} not found`)

                    return this.parseRelated(data)
                }),
            )
    }

    private parseData({
        id,
        title: { pretty, english, japanese },
        media_id,
        images,
        num_pages,
        num_favorites,
        upload_date,
        tags,
    }: Data): ParsedDataDto {
        return {
            id: +id,
            title: {
                display: sanitize(pretty),
                english: sanitize(english),
                japanese: sanitize(japanese)
            },
            images: linkImage(images, media_id, {
                includePages: true
            }),
            info: {
                amount: num_pages,
                favorite: num_favorites,
                upload: {
                    original: upload_date,
                    parsed: new Date(
                        +upload_date,
                    ).toLocaleDateString('en-US')
                }
            },
            metadata: filterTag(tags)
        }
    }

    private parseRelated(data: RelatedDto): ParsedRelatedDto[] {
        const related: ParsedRelatedDto[] = []

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
            }) =>
                related.push(
                    {
                        id: +id,
                        title: {
                            display: sanitize(pretty),
                            english: sanitize(english),
                            japanese: sanitize(japanese)
                        },
                        images: linkImage(images, media_id, {
                            includePages: false,
                        }),
                        info: {
                            amount: num_pages,
                            favorite: num_favorites,
                            upload: {
                                original: upload_date,
                                parsed: new Date(
                                    +upload_date,
                                ).toLocaleDateString('en-US')
                            }
                        },
                        metadata: filterTag(tags)
                    },
                ),
        )

        return related
    }
}
