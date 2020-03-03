import { PipeTransform, BadRequestException } from '@nestjs/common'
import { sanitize } from 'src/helpers'

export default class ParseSingleParam implements PipeTransform {
    transform(value: { [key: string]: string }) {
        const propertyName: string = Object.getOwnPropertyNames(value)[0]

        const parsedParam = sanitize(value[propertyName]).toLowerCase()

        if (!parsedParam.length)
            throw new BadRequestException(
                `:${propertyName} required a value`,
            )

        return parsedParam
    }
}
