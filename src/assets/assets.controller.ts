import { Controller, Get, Param, Post, Body, Query, Delete, HttpStatus, Put } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetTypeInfo } from "./dto/assetTypeInfo";
import { CreateAssetType } from "./dto/createAssetType";
import { DeleteAssetType } from "./dto/deleteAssetType";
import { UpdateAssetType } from "./dto/updateAssetType";

@Controller('assets')
export class AssetsController {
    constructor(private assetsService: AssetsService) { }

    @Get()
    public async Get(): Promise<AssetTypeInfo[]> {
        var assets = await this.assetsService.FindAll();
        return assets;
    }

    @Get()
    public async GetById(id:String): Promise<AssetTypeInfo> {
        var asset = await this.assetsService.GetById(id);
        return asset;
    }

    @Post()
    public async Create(@Body() createAssetType: CreateAssetType): Promise<AssetTypeInfo> {
        var assets = await this.assetsService.Create(createAssetType);
        return assets;
    }

    @Put()
    public async Update(@Body() updateAssetType: UpdateAssetType): Promise<AssetTypeInfo> {
        var assets = await this.assetsService.Update(updateAssetType);
        return assets;
    }

    @Delete()
    public async Delete(@Body() deleteAssetType: DeleteAssetType): Promise<HttpStatus> {
        await this.assetsService.Delete(deleteAssetType);
        return HttpStatus.OK;
    }
}
