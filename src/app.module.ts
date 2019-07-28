import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AssetsModule,
            MongooseModule.forRoot('mongodb://mongodb:27017/asset-type-store')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
