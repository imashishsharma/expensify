import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TransactionFunnel } from './transaction-funnel.model';
import { TransactionFunnelPopupService } from './transaction-funnel-popup.service';
import { TransactionFunnelService } from './transaction-funnel.service';

@Component({
    selector: 'jhi-transaction-funnel-delete-dialog',
    templateUrl: './transaction-funnel-delete-dialog.component.html'
})
export class TransactionFunnelDeleteDialogComponent {

    transactionFunnel: TransactionFunnel;

    constructor(
        private transactionFunnelService: TransactionFunnelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transactionFunnelService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'transactionFunnelListModification',
                content: 'Deleted an transactionFunnel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transaction-funnel-delete-popup',
    template: ''
})
export class TransactionFunnelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transactionFunnelPopupService: TransactionFunnelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.transactionFunnelPopupService
                .open(TransactionFunnelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
