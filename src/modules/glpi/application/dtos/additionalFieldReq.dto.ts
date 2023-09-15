import { AutoMap } from "@automapper/classes";
import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from "class-validator";


export class AdditionalFieldReqDto  {

    @AutoMap()
    itemsId: number;

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    itemType: string;

    @ApiProperty()
    @IsPositive()
    @AutoMap()
    pluginFieldsContainersId: number;

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    DNI: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    requesterFullname: string;

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    modularCode: string;

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    phone: string;
}

