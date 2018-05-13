import { BaseEntity } from './../../shared';

export class TransactionFunnel implements BaseEntity {
    constructor(
        public id?: number,
        public percentage?: number,
        public transactionCategoryId?: number,
    ) {
    }
}
