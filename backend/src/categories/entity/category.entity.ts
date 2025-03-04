import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Note } from '../../notes/entity/note.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Note, (note) => note.categories)
  notes: Note[];
}
