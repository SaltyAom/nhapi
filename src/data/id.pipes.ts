import {
    PipeTransform,
    NotFoundException,
} from '@nestjs/common'

export default class IDValidation implements PipeTransform {
    transform(value: string) {
        if (isNaN(parseInt(value, 10)) || value.length > 6)
            throw new NotFoundException('')

        return value
    }
}
