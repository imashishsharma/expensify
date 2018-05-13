/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExpensifyTestModule } from '../../../test.module';
import { TransactionCategoryComponent } from '../../../../../../main/webapp/app/entities/transaction-category/transaction-category.component';
import { TransactionCategoryService } from '../../../../../../main/webapp/app/entities/transaction-category/transaction-category.service';
import { TransactionCategory } from '../../../../../../main/webapp/app/entities/transaction-category/transaction-category.model';

describe('Component Tests', () => {

    describe('TransactionCategory Management Component', () => {
        let comp: TransactionCategoryComponent;
        let fixture: ComponentFixture<TransactionCategoryComponent>;
        let service: TransactionCategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ExpensifyTestModule],
                declarations: [TransactionCategoryComponent],
                providers: [
                    TransactionCategoryService
                ]
            })
            .overrideTemplate(TransactionCategoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionCategoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TransactionCategory(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.transactionCategories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
