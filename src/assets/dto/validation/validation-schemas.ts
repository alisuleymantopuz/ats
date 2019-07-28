import { object, string, ObjectSchema, array } from 'joi';

export const CreateAssetTypeSchema: ObjectSchema = object({
    name: string().required().not().empty(),
    types: array()
});

export const DeleteAssetTypeSchema: ObjectSchema = object({
    id: string().required().not().empty().label("Id is required and can not be empty."),
});