import { AutoMap } from "@automapper/classes";


export class AdditionalFieldRespDto  {
    @AutoMap()
    id?: number;

    @AutoMap()
    itemsId: number;

    @AutoMap()
    itemType: string;

    @AutoMap()
    pluginFieldsContainersId: number;

    @AutoMap()
    DNI: string;

    @AutoMap()
    requesterFullname: string;


    @AutoMap()
    modularCode: string;

    @AutoMap()
    phone: string;
}

