/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AdditionalFieldImplRepository } from './infrastructure/repository/additionalFieldImpl.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalFieldEntity } from './domain/model/additionalField.entity';
import { GlpiController } from './infrastructure/controller/glpi.controller';
import { GlpiImplService } from './application/service/glpiImpl.service';
import { TicketEntity } from './domain/model/ticket.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([AdditionalFieldEntity]),
        TypeOrmModule.forFeature([TicketEntity]),
    ],
    controllers: [GlpiController],
    providers: [GlpiImplService, AdditionalFieldImplRepository],
})
export class GlpiModule { }
