
import { mapper } from "./mapper";
import { AdditionalFieldEntity } from "src/modules/glpi/domain/model/additionalField.entity";
import { createMap } from '@automapper/core';
import { AdditionalFieldReqDto } from "src/modules/glpi/application/dtos/additionalFieldReq.dto";

export const resourceToModel = () => {
    createMap(mapper, AdditionalFieldReqDto, AdditionalFieldEntity);
}