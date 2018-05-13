/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ExpensifyTestModule } from '../../../test.module';
import { TransactionFunnelDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/transaction-funnel/transaction-funnel-delete-dialog.component';
import { TransactionFunnelService } from '../../../../../../main/webapp/app/entities/transaction-funnel/transaction-funnel.service';

describe('Component Tests', () => {

    describe('TransactionFunnel Management Delete Component', () => {
        let comp: TransactionFunnelDeleteDialogComponent;
        let fixture: ComponentFixture<TransactionFunnelDeleteDialogComponent>;
        let service: TransactionFunnelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ExpensifyTestModule],
                declarations: [TransactionFunnelDeleteDialogComponent],
                providers: [
                    TransactionFunnelService
                ]
            })
            .overrideTemplate(TransactionFunnelDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionFunnelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionFunnelService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
