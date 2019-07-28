import { ApiModelProperty } from '@nestjs/swagger';
export class AssetTypeInfo {
    @ApiModelProperty()
    id: String;
    @ApiModelProperty()
    name: String;
    @ApiModelProperty()
    types: String[];
}
