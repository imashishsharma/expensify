import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ExpensifyTransactionCategoryModule } from './transaction-category/transaction-category.module';
import { ExpensifyTransactionFunnelModule } from './transaction-funnel/transaction-funnel.module';
import { ExpensifyTransactionModule } from './transaction/transaction.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ExpensifyTransactionCategoryModule,
        ExpensifyTransactionFunnelModule,
        ExpensifyTransactionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExpensifyEntityModule {}
