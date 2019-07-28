import { Asset } from '../interfaces/asset.interface';

export interface AssetValidation {
     CheckAvailability(newAsset: String): Promise<Asset> ;
}