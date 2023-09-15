import { AdditionalFieldEntity } from "../model/additionalField.entity";

export interface IAdditionalFieldRepository {
    registerAdditionalInformation(addField: AdditionalFieldEntity): Promise<AdditionalFieldEntity>;
    updateAdditionalInformationByTicketId(addInfoId: number, addField: AdditionalFieldEntity): Promise<AdditionalFieldEntity>;
    deleteAdditionalInformationByTicketId(addInfoId: number): Promise<AdditionalFieldEntity>;
    getAdditionalInformationByTicketId(ticketId: number): Promise<AdditionalFieldEntity>;
}