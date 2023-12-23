import { Module } from '@nestjs/common';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
  imports: [
    MulterModule.register({
      dest: "./images"
    })
  ]
})
export class ApartmentsModule {}
