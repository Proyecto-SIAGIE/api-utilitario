import { HttpStatus, Injectable } from '@nestjs/common';
import { IGlpiService } from '../../domain/interface/iglpiApi.service';
import { AdditionalFieldImplRepository } from 'src/modules/glpi/infrastructure/repository/additionalFieldImpl.repository';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { IGenericResponse } from 'src/utils/generic';

import { AdditionalFieldReqDto } from '../dtos/additionalFieldReq.dto';
import { AdditionalFieldRespDto } from '../dtos/additionalFieldResp.dto';
import { mapper } from 'src/utils/mapping/mapper';
import { AdditionalFieldEntity } from '../../domain/model/additionalField.entity';
import { HttpStatusCode } from 'axios';
import { getManager } from 'typeorm';



@Injectable()
export class GlpiImplService implements IGlpiService {
    constructor(private readonly additionalFieldRepository: AdditionalFieldImplRepository) { }
    
    
    async updateAdditionalInformationByTicketId(ticketId: number, addField: AdditionalFieldReqDto): Promise<IGenericResponse<AdditionalFieldRespDto>> {
        try{

            const addInfoEntity = mapper.map(addField, AdditionalFieldReqDto, AdditionalFieldEntity);
            const responseAddInfo = await this.additionalFieldRepository.updateAdditionalInformationByTicketId(ticketId, addInfoEntity);
            if (!responseAddInfo) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Additional-Info with Id ${ticketId} not found`
                })
            }

            const mapAddInfo = mapper.map(responseAddInfo, AdditionalFieldEntity, AdditionalFieldRespDto);
            return {
                success: true,
                data: mapAddInfo,
                messages: [''],
                code: HttpStatus.OK
            }
           
        }catch(error){
            throw ErrorManager.createSignatureError(error.message);
        }
    }
    
    async deleteAdditionalInformationByTicketId(ticketId: number): Promise<IGenericResponse<AdditionalFieldRespDto>> {
        try{

            const responseAddInfo = await this.additionalFieldRepository.deleteAdditionalInformationByTicketId(ticketId);
            if (!responseAddInfo) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Additional-Info with ticketId ${ticketId} not found`
                })
            }

            const mapAddInfo = mapper.map(responseAddInfo, AdditionalFieldEntity, AdditionalFieldRespDto);
            return {
                success: true,
                data: mapAddInfo,
                messages: [''],
                code: HttpStatus.OK
            }

        }catch(error){
            throw ErrorManager.createSignatureError(error.message);
        }
    }
    
    async getAdditionalInformationByTicketId(ticketId: number): Promise<IGenericResponse<AdditionalFieldRespDto>> {
        try{

            const responseAddInfo = await this.additionalFieldRepository.getAdditionalInformationByTicketId(ticketId);
            if (!responseAddInfo) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Additional-Info with TicketId ${ticketId} not found`
                })
            }

            const mapAddInfo = mapper.map(responseAddInfo, AdditionalFieldEntity, AdditionalFieldRespDto);
            return {
                success: true,
                data: mapAddInfo,
                messages: [''],
                code: HttpStatus.OK
            }

        }catch(error){
            throw ErrorManager.createSignatureError(error.message);
        }
    }
    
    
    async registerAdditionalInfoOfTicketById(ticketId: number, addFieldDto: AdditionalFieldReqDto): Promise<IGenericResponse<AdditionalFieldRespDto>> {
        try{

            addFieldDto.itemsId = ticketId;

            const addEntity = mapper.map(addFieldDto,AdditionalFieldReqDto,AdditionalFieldEntity);
           
            const respAddEntity = await this.additionalFieldRepository.registerAdditionalInformation(addEntity);
            if(!respAddEntity){
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Probably the 'pluginFieldsContainersId' is wrong or the GLPI 
                    AdditionalField plugin was not configured`
                })
            }

            const respDto = mapper.map(respAddEntity,AdditionalFieldEntity,AdditionalFieldRespDto);

            return {
                success: true,
                code: HttpStatusCode.Accepted,
                data: respDto,
                messages: []    
            }

        }catch(error){
            throw ErrorManager.createSignatureError(error.message);
        }
    }
    
}

