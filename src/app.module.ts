import { Module } from '@nestjs/common'
import AppModule from 'src/app'

@Module({
    imports: [AppModule],
})
export default class MainModule {}
