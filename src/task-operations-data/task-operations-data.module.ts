import { Module } from '@nestjs/common';
import { TaskOperationsDataController } from './task-operations-data.controller';
import { TaskOperationsDataService } from './task-operations-data.service';

@Module({
  controllers: [TaskOperationsDataController],
  providers: [TaskOperationsDataService]
})
export class TaskOperationsDataModule {}
