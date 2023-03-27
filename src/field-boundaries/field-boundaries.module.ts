import { Module } from '@nestjs/common';
import { FieldBoundariesController } from './field-boundaries.controller';
import { FieldBoundariesService } from './field-boundaries.service';

@Module({
    controllers: [FieldBoundariesController],
    providers: [FieldBoundariesService]
})
export class FieldBoundariesModule {}
