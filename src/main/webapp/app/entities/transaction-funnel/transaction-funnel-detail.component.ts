import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TransactionFunnel } from './transaction-funnel.model';
import { TransactionFunnelService } from './transaction-funnel.service';

@Component({
    selector: 'jhi-transaction-funnel-detail',
    templateUrl: './transaction-funnel-detail.component.html'
})
export class TransactionFunnelDetailComponent implements OnInit, OnDestroy {

    transactionFunnel: TransactionFunnel;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private transactionFunnelService: TransactionFunnelService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTransactionFunnels();
    }

    load(id) {
        this.transactionFunnelService.find(id)
            .subscribe((transactionFunnelResponse: HttpResponse<TransactionFunnel>) => {
                this.transactionFunnel = transactionFunnelResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTransactionFunnels() {
        this.eventSubscriber = this.eventManager.subscribe(
            'transactionFunnelListModification',
            (response) => this.load(this.transactionFunnel.id)
        );
    }
}
