import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string

  @Column('text')
  text: string;

  @Column()
  archived: boolean;
}
