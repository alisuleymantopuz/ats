import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { AssetsController } from './assets/assets.controller';
// import { ConfigModule } from './config/config.module';
// import { ConfigService } from './config/config.service'; 

// const configService = new ConfigService(`${process.env.NODE_ENV}.env`);
@Module({
  imports: [AssetsModule,
            MongooseModule.forRoot('mongodb://mongodb:27017/asset-type-store'),
            CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(AssetsController);
  }
}