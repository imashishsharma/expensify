/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExpensifyTestModule } from '../../../test.module';
import { TransactionFunnelComponent } from '../../../../../../main/webapp/app/entities/transaction-funnel/transaction-funnel.component';
import { TransactionFunnelService } from '../../../../../../main/webapp/app/entities/transaction-funnel/transaction-funnel.service';
import { TransactionFunnel } from '../../../../../../main/webapp/app/entities/transaction-funnel/transaction-funnel.model';

describe('Component Tests', () => {

    describe('TransactionFunnel Management Component', () => {
        let comp: TransactionFunnelComponent;
        let fixture: ComponentFixture<TransactionFunnelComponent>;
        let service: TransactionFunnelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ExpensifyTestModule],
                declarations: [TransactionFunnelComponent],
                providers: [
                    TransactionFunnelService
                ]
            })
            .overrideTemplate(TransactionFunnelComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionFunnelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionFunnelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TransactionFunnel(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.transactionFunnels[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
