import * as mongoose from 'mongoose';

export const AssetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  types: { type: [String]},
});