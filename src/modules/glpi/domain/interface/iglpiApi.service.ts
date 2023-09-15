import { IGenericResponse } from "src/utils/generic";
import { AdditionalFieldRespDto } from "../../application/dtos/additionalFieldResp.dto";
import { AdditionalFieldReqDto } from "../../application/dtos/additionalFieldReq.dto";


export interface IGlpiService {
    registerAdditionalInfoOfTicketById(ticketId: number, addFieldDto: AdditionalFieldReqDto): Promise<IGenericResponse<AdditionalFieldRespDto>>;
    updateAdditionalInformationByTicketId(ticketId: number, addField: AdditionalFieldReqDto): Promise<IGenericResponse<AdditionalFieldRespDto>>;
    deleteAdditionalInformationByTicketId(ticketId: number): Promise<IGenericResponse<AdditionalFieldRespDto>>;
    getAdditionalInformationByTicketId(ticketId: number): Promise<IGenericResponse<AdditionalFieldRespDto>>;
}