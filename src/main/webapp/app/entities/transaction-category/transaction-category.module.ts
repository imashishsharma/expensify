import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExpensifySharedModule } from '../../shared';
import {
    TransactionCategoryService,
    TransactionCategoryPopupService,
    TransactionCategoryComponent,
    TransactionCategoryDetailComponent,
    TransactionCategoryDialogComponent,
    TransactionCategoryPopupComponent,
    TransactionCategoryDeletePopupComponent,
    TransactionCategoryDeleteDialogComponent,
    transactionCategoryRoute,
    transactionCategoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...transactionCategoryRoute,
    ...transactionCategoryPopupRoute,
];

@NgModule({
    imports: [
        ExpensifySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransactionCategoryComponent,
        TransactionCategoryDetailComponent,
        TransactionCategoryDialogComponent,
        TransactionCategoryDeleteDialogComponent,
        TransactionCategoryPopupComponent,
        TransactionCategoryDeletePopupComponent,
    ],
    entryComponents: [
        TransactionCategoryComponent,
        TransactionCategoryDialogComponent,
        TransactionCategoryPopupComponent,
        TransactionCategoryDeleteDialogComponent,
        TransactionCategoryDeletePopupComponent,
    ],
    providers: [
        TransactionCategoryService,
        TransactionCategoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExpensifyTransactionCategoryModule {}
