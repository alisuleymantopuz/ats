import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';


export class CreateAssetType {
    @ApiModelProperty()
    @IsString()
    name: String;
    
    @ApiModelProperty()
    @IsArray()
    types: String[];
}
