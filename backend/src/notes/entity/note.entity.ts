import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../../categories/entity/category.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  text: string;

  @Column()
  archived: boolean;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
