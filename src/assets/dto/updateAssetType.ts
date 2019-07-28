import { ApiModelProperty } from '@nestjs/swagger';
export class UpdateAssetType {
    @ApiModelProperty()
    name: String;
    @ApiModelProperty()
    types: String[];
}
