import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Asset, AssetConverters } from './interfaces/asset.interface';
import { AssetValidation } from './validation/asset.validation';
import { AssetTypeInfo } from "./dto/assetTypeInfo";
import { CreateAssetType } from "./dto/createAssetType";
import { DeleteAssetType } from "./dto/deleteAssetType";
import { UpdateAssetType } from "./dto/updateAssetType";
import { CreateAssetTypeSchema, DeleteAssetTypeSchema } from './dto/validation/validation-schemas';

@Injectable()
export class AssetsService implements AssetValidation {
    constructor(@InjectModel('Asset') private readonly assetModel: Model<Asset>) { }

    public async Create(createAssetType: CreateAssetType): Promise<AssetTypeInfo> {

        var validationResult = CreateAssetTypeSchema.validate(createAssetType);
        if (validationResult.error) {
            throw new HttpException(validationResult.error.details.map(d => d.message), HttpStatus.BAD_REQUEST);
        }
        var assetCreated = await this.CheckAvailability(createAssetType.name);
        if (assetCreated) {
            return AssetConverters.toAssetTypeInfo(assetCreated);
        }
        var newAsset = await new this.assetModel(createAssetType).save();
        return AssetConverters.toAssetTypeInfo(newAsset);
    }

    public async Update(updateAssetType: UpdateAssetType): Promise<AssetTypeInfo> {

        var asset = await this.CheckAvailability(updateAssetType.name);
        if (!asset) {
            throw new HttpException("Asset is not found.", HttpStatus.NOT_FOUND);
        }
        asset.name = updateAssetType.name;
        asset.types = updateAssetType.types;
        await this.assetModel.updateOne({ _id: asset._id }, asset);

        return AssetConverters.toAssetTypeInfo(asset);
    }

    public async Delete(deleteAssetType: DeleteAssetType) {

        var validationResult = DeleteAssetTypeSchema.validate(deleteAssetType);
        if (validationResult.error) {
            throw new HttpException(validationResult.error.details.map(d => d.message), HttpStatus.BAD_REQUEST);
        }
        this.assetModel.findOneAndDelete({ _id: deleteAssetType.id });
    }

    public async FindAll(): Promise<AssetTypeInfo[]> {

        var result = await this.assetModel.find().exec();
        var dto = AssetConverters.toAssetTypeInfos(result)
        return dto;
    }


    public async GetById(id:String): Promise<AssetTypeInfo> {

        var result = await this.assetModel.findById(id).exec();
        var dto = AssetConverters.toAssetTypeInfo(result)
        return dto;
    }

    public async CheckAvailability(newAsset: String): Promise<Asset> {
        return this.assetModel.findOne({ name: newAsset }).exec();
    }
}