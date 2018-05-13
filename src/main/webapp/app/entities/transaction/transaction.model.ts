import { BaseEntity } from './../../shared';
import { TransactionCategory } from '../transaction-category';

export class Transaction implements BaseEntity {
    constructor(
        public id?: number,
        public transactionName?: string,
        public transactionDate?: any,
        public createdDate?: any,
        public modifiedDate?: any,
        public delFlag?: boolean,
        public comment?: string,
        public userLogin?: string,
        public userId?: number,
        public transactionCategoryId?: number,
        public transactionCategory?: TransactionCategory,
        public amount?: number
    ) {
        this.delFlag = false;
    }
}
