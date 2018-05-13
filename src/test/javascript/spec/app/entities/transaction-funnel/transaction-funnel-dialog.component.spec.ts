/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ExpensifyTestModule } from '../../../test.module';
import { TransactionFunnelDialogComponent } from '../../../../../../main/webapp/app/entities/transaction-funnel/transaction-funnel-dialog.component';
import { TransactionFunnelService } from '../../../../../../main/webapp/app/entities/transaction-funnel/transaction-funnel.service';
import { TransactionFunnel } from '../../../../../../main/webapp/app/entities/transaction-funnel/transaction-funnel.model';
import { TransactionCategoryService } from '../../../../../../main/webapp/app/entities/transaction-category';

describe('Component Tests', () => {

    describe('TransactionFunnel Management Dialog Component', () => {
        let comp: TransactionFunnelDialogComponent;
        let fixture: ComponentFixture<TransactionFunnelDialogComponent>;
        let service: TransactionFunnelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ExpensifyTestModule],
                declarations: [TransactionFunnelDialogComponent],
                providers: [
                    TransactionCategoryService,
                    TransactionFunnelService
                ]
            })
            .overrideTemplate(TransactionFunnelDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionFunnelDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionFunnelService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TransactionFunnel(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.transactionFunnel = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transactionFunnelListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TransactionFunnel();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.transactionFunnel = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transactionFunnelListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
