import { Injectable } from "@nestjs/common";
import { IAdditionalFieldRepository } from "../../domain/interface/iadditionalField.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AdditionalFieldEntity } from "../../domain/model/additionalField.entity";
import { Repository } from "typeorm";
import { TicketEntity } from "../../domain/model/ticket.entity";
import { ErrorManager } from "src/utils/errors/error.manager";

@Injectable()
export class AdditionalFieldImplRepository implements IAdditionalFieldRepository{
    constructor(
        @InjectRepository(AdditionalFieldEntity)
        private readonly additionalFieldRepo: Repository<AdditionalFieldEntity>,
        @InjectRepository(TicketEntity)
        private readonly ticketRepo: Repository<TicketEntity>
    ){}

    async updateAdditionalInformationByTicketId(ticketId: number, addField: AdditionalFieldEntity): Promise<AdditionalFieldEntity> {
        const additionalInfo = await this.additionalFieldRepo.findOneBy({itemsId: ticketId});
        if(!additionalInfo) return null;

        const addInfoPreload = await this.additionalFieldRepo.preload({
            id: additionalInfo.id,
            pluginFieldsContainersId: additionalInfo.pluginFieldsContainersId,
            itemType: additionalInfo.itemType,
            itemsId: additionalInfo.itemsId,
            ...addField
        })
        const addInfoeUpdated = await this.additionalFieldRepo.save(addInfoPreload);
        return addInfoeUpdated;
    }
    
    async deleteAdditionalInformationByTicketId(ticketId: number): Promise<AdditionalFieldEntity> {
        const additionalInfo = await this.additionalFieldRepo.findOneBy({itemsId: ticketId});
        if(!additionalInfo) return null;
        const removedInfo = await this.additionalFieldRepo.remove(additionalInfo);
        return removedInfo;
    }
    
    async getAdditionalInformationByTicketId(ticketId: number): Promise<AdditionalFieldEntity> {
        const additionalInfo = await this.additionalFieldRepo.findOneBy({itemsId: ticketId});
        return additionalInfo;
    }
    
    async registerAdditionalInformation(addField: AdditionalFieldEntity): Promise<AdditionalFieldEntity> {
        const ticket = await this.ticketRepo.findOneBy({id: addField.itemsId});
        if(!ticket){
            throw new ErrorManager({
                type: 'NOT_FOUND',
                message: `Ticket with Id ${addField.itemsId} not found in GLPI`
            })
        }

        const preload = this.additionalFieldRepo.create(addField);
        return await this.additionalFieldRepo.save(preload);
    }


}