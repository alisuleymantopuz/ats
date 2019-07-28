import { ApiModelProperty } from '@nestjs/swagger';
export class CreateAssetType {
    @ApiModelProperty()
    name: String;
    @ApiModelProperty()
    types: String[];
}
