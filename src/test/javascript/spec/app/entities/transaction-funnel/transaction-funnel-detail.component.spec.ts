/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ExpensifyTestModule } from '../../../test.module';
import { TransactionFunnelDetailComponent } from '../../../../../../main/webapp/app/entities/transaction-funnel/transaction-funnel-detail.component';
import { TransactionFunnelService } from '../../../../../../main/webapp/app/entities/transaction-funnel/transaction-funnel.service';
import { TransactionFunnel } from '../../../../../../main/webapp/app/entities/transaction-funnel/transaction-funnel.model';

describe('Component Tests', () => {

    describe('TransactionFunnel Management Detail Component', () => {
        let comp: TransactionFunnelDetailComponent;
        let fixture: ComponentFixture<TransactionFunnelDetailComponent>;
        let service: TransactionFunnelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ExpensifyTestModule],
                declarations: [TransactionFunnelDetailComponent],
                providers: [
                    TransactionFunnelService
                ]
            })
            .overrideTemplate(TransactionFunnelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionFunnelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionFunnelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TransactionFunnel(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.transactionFunnel).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
