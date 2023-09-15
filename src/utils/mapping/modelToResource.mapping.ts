import { createMap } from '@automapper/core';
import { mapper } from './mapper';
import { AdditionalFieldRespDto } from 'src/modules/glpi/application/dtos/additionalFieldResp.dto';
import { AdditionalFieldEntity } from 'src/modules/glpi/domain/model/additionalField.entity';



export const modelToResource = () =>{
    createMap(mapper, AdditionalFieldEntity, AdditionalFieldRespDto);
}
