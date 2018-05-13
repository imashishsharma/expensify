import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TransactionFunnel } from './transaction-funnel.model';
import { TransactionFunnelPopupService } from './transaction-funnel-popup.service';
import { TransactionFunnelService } from './transaction-funnel.service';
import { TransactionCategory, TransactionCategoryService } from '../transaction-category';

@Component({
    selector: 'jhi-transaction-funnel-dialog',
    templateUrl: './transaction-funnel-dialog.component.html'
})
export class TransactionFunnelDialogComponent implements OnInit {

    transactionFunnel: TransactionFunnel;
    isSaving: boolean;

    transactioncategories: TransactionCategory[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private transactionFunnelService: TransactionFunnelService,
        private transactionCategoryService: TransactionCategoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.transactionCategoryService
            .query({filter: 'transactionfunnel-is-null'})
            .subscribe((res: HttpResponse<TransactionCategory[]>) => {
                if (!this.transactionFunnel.transactionCategoryId) {
                    this.transactioncategories = res.body;
                } else {
                    this.transactionCategoryService
                        .find(this.transactionFunnel.transactionCategoryId)
                        .subscribe((subRes: HttpResponse<TransactionCategory>) => {
                            this.transactioncategories = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.transactionFunnel.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transactionFunnelService.update(this.transactionFunnel));
        } else {
            this.subscribeToSaveResponse(
                this.transactionFunnelService.create(this.transactionFunnel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TransactionFunnel>>) {
        result.subscribe((res: HttpResponse<TransactionFunnel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TransactionFunnel) {
        this.eventManager.broadcast({ name: 'transactionFunnelListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTransactionCategoryById(index: number, item: TransactionCategory) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-transaction-funnel-popup',
    template: ''
})
export class TransactionFunnelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transactionFunnelPopupService: TransactionFunnelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.transactionFunnelPopupService
                    .open(TransactionFunnelDialogComponent as Component, params['id']);
            } else {
                this.transactionFunnelPopupService
                    .open(TransactionFunnelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
