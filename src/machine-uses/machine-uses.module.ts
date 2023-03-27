import { Module } from '@nestjs/common';
import { MachineUsesController } from './machine-uses.controller';
import { MachineUsesService } from './machine-uses.service';

@Module({
  controllers: [MachineUsesController],
  providers: [MachineUsesService]
})
export class MachineUsesModule {}
