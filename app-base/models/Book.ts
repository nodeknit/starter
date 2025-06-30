import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({ tableName: 'books', timestamps: true })
export class Book extends Model {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare title: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare author: string;

    @Column({ type: DataType.ENUM('free', 'given'), allowNull: false, defaultValue: 'free' })
    declare status: 'free' | 'given';
} 