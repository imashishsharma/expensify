import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TransactionCategory } from './transaction-category.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TransactionCategory>;

@Injectable()
export class TransactionCategoryService {

    private resourceUrl =  SERVER_API_URL + 'api/transaction-categories';

    constructor(private http: HttpClient) { }

    create(transactionCategory: TransactionCategory): Observable<EntityResponseType> {
        const copy = this.convert(transactionCategory);
        return this.http.post<TransactionCategory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(transactionCategory: TransactionCategory): Observable<EntityResponseType> {
        const copy = this.convert(transactionCategory);
        return this.http.put<TransactionCategory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TransactionCategory>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TransactionCategory[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransactionCategory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TransactionCategory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TransactionCategory = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TransactionCategory[]>): HttpResponse<TransactionCategory[]> {
        const jsonResponse: TransactionCategory[] = res.body;
        const body: TransactionCategory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TransactionCategory.
     */
    private convertItemFromServer(transactionCategory: TransactionCategory): TransactionCategory {
        const copy: TransactionCategory = Object.assign({}, transactionCategory);
        return copy;
    }

    /**
     * Convert a TransactionCategory to a JSON which can be sent to the server.
     */
    private convert(transactionCategory: TransactionCategory): TransactionCategory {
        const copy: TransactionCategory = Object.assign({}, transactionCategory);
        return copy;
    }
}
