import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TransactionCategory } from './transaction-category.model';
import { TransactionCategoryService } from './transaction-category.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-transaction-category',
    templateUrl: './transaction-category.component.html'
})
export class TransactionCategoryComponent implements OnInit, OnDestroy {
transactionCategories: TransactionCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private transactionCategoryService: TransactionCategoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.transactionCategoryService.query().subscribe(
            (res: HttpResponse<TransactionCategory[]>) => {
                this.transactionCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTransactionCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TransactionCategory) {
        return item.id;
    }
    registerChangeInTransactionCategories() {
        this.eventSubscriber = this.eventManager.subscribe('transactionCategoryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
