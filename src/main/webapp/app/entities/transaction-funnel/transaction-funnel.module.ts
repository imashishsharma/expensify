import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExpensifySharedModule } from '../../shared';
import {
    TransactionFunnelService,
    TransactionFunnelPopupService,
    TransactionFunnelComponent,
    TransactionFunnelDetailComponent,
    TransactionFunnelDialogComponent,
    TransactionFunnelPopupComponent,
    TransactionFunnelDeletePopupComponent,
    TransactionFunnelDeleteDialogComponent,
    transactionFunnelRoute,
    transactionFunnelPopupRoute,
} from './';

const ENTITY_STATES = [
    ...transactionFunnelRoute,
    ...transactionFunnelPopupRoute,
];

@NgModule({
    imports: [
        ExpensifySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransactionFunnelComponent,
        TransactionFunnelDetailComponent,
        TransactionFunnelDialogComponent,
        TransactionFunnelDeleteDialogComponent,
        TransactionFunnelPopupComponent,
        TransactionFunnelDeletePopupComponent,
    ],
    entryComponents: [
        TransactionFunnelComponent,
        TransactionFunnelDialogComponent,
        TransactionFunnelPopupComponent,
        TransactionFunnelDeleteDialogComponent,
        TransactionFunnelDeletePopupComponent,
    ],
    providers: [
        TransactionFunnelService,
        TransactionFunnelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExpensifyTransactionFunnelModule {}
