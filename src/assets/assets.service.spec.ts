import { Test, TestingModule } from '@nestjs/testing';
import { AssetsService } from './assets.service';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import mockingoose from 'mockingoose';
import { AssetSchema } from './schemas/asset.schema';
import { DeleteAssetType } from './dto/DeleteAssetType';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateAssetType } from './dto/CreateAssetType';
import { AssetTypeInfo } from './dto/AssetTypeInfo';
import { UpdateAssetType } from './dto/UpdateAssetType';

describe('AssetsService', () => {
  let service: AssetsService;

  beforeEach(async () => {
    mockingoose.resetAll();
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetsService,
        {
          provide: getModelToken('Asset'),
          useValue: AssetTestModel,
        }],
    }).compile();

    service = module.get<AssetsService>(AssetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkAvailability - available', () => {
    it('should check asset type availability in an array of asset types', async () => {
      const _doc = { _id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] };
      mockingoose(AssetTestModel).toReturn(_doc, 'findOne');
      await service.CheckAvailability("Movie").then(asset => {
        expect(asset).not.toBeNull();
        expect(JSON.parse(JSON.stringify(asset))).toMatchObject(_doc);
      });
    });
  });

  describe('checkAvailability - unavailable', () => {
    it('should check asset type availability in an array of asset types', async () => {
      const _doc = null;
      mockingoose(AssetTestModel).toReturn(_doc, 'findOne');
      await service.CheckAvailability("Movie").then(asset => {
        expect(asset).toBeNull();
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of asset types', async () => {
      const _docs = [{ _id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] }];
      const _received = [{ id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] }];
      mockingoose(AssetTestModel).toReturn(_docs, 'find');
      await service.FindAll().then(doc => {
        expect(doc).not.toBeNull();
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_received);
      });
    });
  });

  describe('getById', () => {
    it('should return an asset types by Id', async () => {
      const _doc = { _id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] };
      const _received = { id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] };
      mockingoose(AssetTestModel).toReturn(_doc, 'findOne');
      await service.GetById(_doc._id).then(doc => {
        expect(doc).not.toBeNull();
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_received);
      });
    });
  });

  describe('delete - throws exception', () => {
    it('should throws exception due to lack of id', async () => {
      const _deleteRequestModel: DeleteAssetType = { id: null };
      await service.Delete(_deleteRequestModel).catch((exception: HttpException) => {
        expect(exception).not.toBeNull();
        expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      });
    });
  });

  describe('delete', () => {
    it('should delete asset type by id', async () => {
      const _deleteRequestModel: DeleteAssetType = { id: '507f191e810c19729de860ea' };
      mockingoose(AssetTestModel).toReturn([{ id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] }]);
      mockingoose(AssetTestModel).toReturn([{ id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] }], 'deleteOne');
      jest.spyOn(AssetTestModel,'deleteOne');
      await service.Delete(_deleteRequestModel);
      expect(AssetTestModel.deleteOne).toHaveBeenCalledWith({ _id: _deleteRequestModel.id });
    });
  });

  describe('create', () => {
    it('should create asset type by id', async () => {
      const _createRequestModel: CreateAssetType = { name: 'Movie', types: ['Music', 'Video'] };
      const doc = { _id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] };
      const _received: AssetTypeInfo = { id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] };
      mockingoose(AssetTestModel).toReturn(doc, 'save');
      await service.Create(_createRequestModel).then(result => {
        expect(result).not.toBeNull();
        expect(JSON.parse(JSON.stringify(result))).toMatchObject(_received);
      });
    });
  });

  describe('update', () => {
    it('should update asset type by asset type  name', async () => {
      const _updateRequestModel: UpdateAssetType = { name: 'Movie', types: ['Music', 'Video'] };
      const _doc = { _id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] };
      const _received: AssetTypeInfo = { id: '507f191e810c19729de860ea', name: 'Movie', types: ['Music', 'Video'] };
      mockingoose(AssetTestModel).toReturn(_doc, 'update');
      mockingoose(AssetTestModel).toReturn(_doc, 'findOne');
      await service.Update(_updateRequestModel).then(result => {
        expect(result).not.toBeNull();
        expect(JSON.parse(JSON.stringify(result))).toMatchObject(_received);
      });
    });
  });
});

const AssetTestModel = mongoose.model('Asset', AssetSchema);