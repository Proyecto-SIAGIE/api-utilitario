import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("glpi_tickets")
export class TicketEntity {

    @Column('int')
    @PrimaryGeneratedColumn('increment')
    //@AutoMap()
    id: number;

    @Column('longtext')
    content: string
}