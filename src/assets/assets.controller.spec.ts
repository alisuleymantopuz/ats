import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { TestingModule, Test } from '@nestjs/testing';
import { AssetSchema } from './schemas/asset.schema';
import * as mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { AssetTypeInfo } from './dto/AssetTypeInfo';
import { DeleteAssetType } from './dto/DeleteAssetType';
import { UpdateAssetType } from './dto/UpdateAssetType';
import { CreateAssetType } from './dto/CreateAssetType';

describe('AssetsController', () => {
  let controller: AssetsController;
  let service: AssetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetsController],
      providers: [AssetsService,
        {
          provide: getModelToken('Asset'),
          useValue: AssetModel,
        }]
    }).compile();

    service = module.get<AssetsService>(AssetsService)
    controller = module.get<AssetsController>(AssetsController);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return an array of cats', async () => {
      const _received: AssetTypeInfo[] = [{ id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] }];
      const _promise = new Promise<AssetTypeInfo[]>((resolve) => resolve(_received));
      jest.spyOn(service, 'FindAll').mockImplementation(() => _promise);
      expect(await controller.Get()).toBe(_received);
    });
  });

  describe('getById', () => {
    it('should return an asset type', async () => {
      const _received: AssetTypeInfo = { id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] };
      const _promise = new Promise<AssetTypeInfo>((resolve) => resolve(_received));
      jest.spyOn(service, 'GetById').mockImplementation(() => _promise);
      expect(await controller.GetById(_received.id)).toBe(_received);
    });
  });

  describe('delete', () => {
    it('should delete an asset type', async () => {
      const _deleteRequestModel: DeleteAssetType = { id: '507f191e810c19729de860ea' };
      jest.spyOn(service, 'Delete').mockImplementation();
      await controller.Delete(_deleteRequestModel);
      expect(service.Delete).toHaveBeenCalledWith(_deleteRequestModel);
    });
  });

  describe('update', () => {
    it('should update an asset type', async () => {
      const _updateRequestModel: UpdateAssetType = { name: 'Movie', types: ['Music', 'Video'] };
      const _received: AssetTypeInfo = { id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] };
      const _promise = new Promise<AssetTypeInfo>((resolve) => resolve(_received));
      jest.spyOn(service, 'Update').mockImplementation(() => _promise);
      var result = await controller.Update(_updateRequestModel);
      expect(service.Update).toHaveBeenCalledWith(_updateRequestModel);
      expect(result).toBe(_received);
    });
  });

  describe('create', () => {
    it('should create an asset type', async () => {
      const _createRequestModel: CreateAssetType = { name: 'Movie', types: ['Music', 'Video'] };
      const _received: AssetTypeInfo = { id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] };
      const _promise = new Promise<AssetTypeInfo>((resolve) => resolve(_received));
      jest.spyOn(service, 'Create').mockImplementation(() => _promise);
      var result = await controller.Create(_createRequestModel);
      expect(service.Create).toHaveBeenCalledWith(_createRequestModel);
      expect(result).toBe(_received);
    });
  });
});

const AssetModel = mongoose.model('Asset', AssetSchema);