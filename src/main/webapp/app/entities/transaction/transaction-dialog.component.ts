import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDateUtils } from 'ng-jhipster';

import { Transaction } from './transaction.model';
import { TransactionPopupService } from './transaction-popup.service';
import { TransactionService } from './transaction.service';
import { User, UserService, Principal } from '../../shared';
import { TransactionCategory, TransactionCategoryService } from '../transaction-category';

@Component({
    selector: 'jhi-transaction-dialog',
    templateUrl: './transaction-dialog.component.html'
})
export class TransactionDialogComponent implements OnInit {

    transaction: Transaction;
    isSaving: boolean;

    users: User[];
    account: any;

    transactioncategories: TransactionCategory[];

    constructor(
        private principal: Principal,
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private transactionService: TransactionService,
        private userService: UserService,
        private transactionCategoryService: TransactionCategoryService,
        private eventManager: JhiEventManager,
        private dateUtils: JhiDateUtils
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.principal.identity().then((account) => {
            this.account = account;
            this.transaction.userId = account.id;
        });
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => {
                this.users = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.transactionCategoryService.query()
            .subscribe((res: HttpResponse<TransactionCategory[]>) => { this.transactioncategories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.transaction.userLogin = this.account.login;
        // this.transaction.transactionDate = this.dateUtils.convertLocalDateFromServer(this.transaction.transactionDate);
        this.transaction.modifiedDate = this.transaction.transactionDate;
        this.isSaving = true;
        console.log('transaction', this.transaction);
        if (this.transaction.id !== undefined) {
            // this.transaction.createdDate = this.dateUtils.convertLocalDateFromServer(this.transaction.createdDate);
            this.subscribeToSaveResponse(
                this.transactionService.update(this.transaction));
        } else {
            this.transaction.createdDate = new Date();
            this.subscribeToSaveResponse(
                this.transactionService.create(this.transaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Transaction>>) {
        result.subscribe((res: HttpResponse<Transaction>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Transaction) {
        this.eventManager.broadcast({ name: 'transactionListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackTransactionCategoryById(index: number, item: TransactionCategory) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-transaction-popup',
    template: ''
})
export class TransactionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transactionPopupService: TransactionPopupService
    ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.transactionPopupService
                    .open(TransactionDialogComponent as Component, params['id']);
            } else {
                this.transactionPopupService
                    .open(TransactionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
