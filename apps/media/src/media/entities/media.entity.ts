import type { MediaDomains, Media as MediaType } from "@lib/media";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MediaGroup } from "./media-group.entity";

@Entity()
export class Media implements MediaType {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public url: string;

    @Column()
    public domain: MediaDomains;

    @ManyToOne(
        () => MediaGroup,
        (group) => group.media
    )
    public group: MediaGroup;
}
