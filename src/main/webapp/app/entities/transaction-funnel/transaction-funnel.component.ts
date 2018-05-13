import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TransactionFunnel } from './transaction-funnel.model';
import { TransactionFunnelService } from './transaction-funnel.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-transaction-funnel',
    templateUrl: './transaction-funnel.component.html'
})
export class TransactionFunnelComponent implements OnInit, OnDestroy {
transactionFunnels: TransactionFunnel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private transactionFunnelService: TransactionFunnelService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.transactionFunnelService.query().subscribe(
            (res: HttpResponse<TransactionFunnel[]>) => {
                this.transactionFunnels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTransactionFunnels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TransactionFunnel) {
        return item.id;
    }
    registerChangeInTransactionFunnels() {
        this.eventSubscriber = this.eventManager.subscribe('transactionFunnelListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
