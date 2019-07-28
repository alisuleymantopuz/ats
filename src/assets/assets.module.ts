import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { AssetSchema } from './schemas/asset.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Asset', schema: AssetSchema }])],
  controllers: [AssetsController],
  providers: [AssetsService]
})

export class AssetsModule { }
