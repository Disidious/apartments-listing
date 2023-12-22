import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApartmentsModule } from './apartments/apartments.module';

@Module({
  imports: [ApartmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
