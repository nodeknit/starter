import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Book } from './Book';

@Table({ tableName: 'bookings', timestamps: true })
export class Booking extends Model {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare userId: number;

    @ForeignKey(() => Book)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare bookId: number;

    @BelongsTo(() => Book)
    declare book: Book;

    @Column({ type: DataType.DATE, allowNull: false })
    declare from: Date;

    @Column({ type: DataType.DATE, allowNull: false })
    declare to: Date;

    @Column({ type: DataType.ENUM('active', 'cancelled', 'finished'), allowNull: false, defaultValue: 'active' })
    declare status: 'active' | 'cancelled' | 'finished';
} 