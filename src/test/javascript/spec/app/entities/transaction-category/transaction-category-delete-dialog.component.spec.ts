/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ExpensifyTestModule } from '../../../test.module';
import { TransactionCategoryDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/transaction-category/transaction-category-delete-dialog.component';
import { TransactionCategoryService } from '../../../../../../main/webapp/app/entities/transaction-category/transaction-category.service';

describe('Component Tests', () => {

    describe('TransactionCategory Management Delete Component', () => {
        let comp: TransactionCategoryDeleteDialogComponent;
        let fixture: ComponentFixture<TransactionCategoryDeleteDialogComponent>;
        let service: TransactionCategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ExpensifyTestModule],
                declarations: [TransactionCategoryDeleteDialogComponent],
                providers: [
                    TransactionCategoryService
                ]
            })
            .overrideTemplate(TransactionCategoryDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionCategoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionCategoryService);
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
