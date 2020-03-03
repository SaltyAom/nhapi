import { SetMetadata } from '@nestjs/common'

const EnablePerformanceLogging = () => SetMetadata('performance', true)
export default EnablePerformanceLogging