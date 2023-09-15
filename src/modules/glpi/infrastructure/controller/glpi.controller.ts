import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { GlpiImplService } from "../../application/service/glpiImpl.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdditionalFieldReqDto } from "../../application/dtos/additionalFieldReq.dto";

@ApiTags('glpi')
@Controller('glpi')
export class GlpiController {
    constructor(private readonly glpiService: GlpiImplService){}

    @ApiOperation({ summary: 'Obtener additional-info de un ticket por ticketId' })
    @Get('additional-ticket-info/:ticketId')
    async getAdditionalInformationToTicketById(@Param('ticketId', ParseIntPipe) ticketId: number){
        return await this.glpiService.getAdditionalInformationByTicketId(ticketId);
    }

    @ApiOperation({ summary: 'Registrar additional-info de un ticket por ticketId' })
    @Post('additional-ticket-info/:ticketId')
    async registerAdditionalInformationToTicketById(@Param('ticketId', ParseIntPipe) ticketId: number, @Body() addDto: AdditionalFieldReqDto){
        return await this.glpiService.registerAdditionalInfoOfTicketById(ticketId,addDto);
    }

    @ApiOperation({ summary: 'Actualizar additional-info de un ticket por ticketId' })
    @Patch('additional-ticket-info/:ticketId')
    async updateAdditionalInformationToTicketById(@Param('ticketId', ParseIntPipe) ticketId: number, @Body() addDto: AdditionalFieldReqDto){
        return await this.glpiService.updateAdditionalInformationByTicketId(ticketId,addDto);
    }

    @ApiOperation({ summary: 'Eliminar additional-info de un ticket por ticketId' })
    @Delete('additional-ticket-info/:ticketId')
    async deleteAdditionalInformationToTicketById(@Param('ticketId', ParseIntPipe) ticketId: number){
        return await this.glpiService.deleteAdditionalInformationByTicketId(ticketId);
    }
}