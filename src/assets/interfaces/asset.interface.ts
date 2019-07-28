import { Document } from 'mongoose';
import { AssetTypeInfo } from "../dto/assetTypeInfo";

export interface Asset extends Document {
    name: String;
    types: String[];
}

export class AssetConverters {
    static toAssetTypeInfo(asset: Asset): AssetTypeInfo {
        var assetTypeInfo = new AssetTypeInfo();
        assetTypeInfo.id = asset.id;
        assetTypeInfo.name = asset.name;
        assetTypeInfo.types = asset.types;
        return assetTypeInfo;
    }

    static toAssetTypeInfos(assets: Asset[]): AssetTypeInfo[] {

        var dtos = assets.map(val => <AssetTypeInfo>{
            id: val.id,
            name:val.name,
            types: val.types
        });
        return dtos;
    }
}