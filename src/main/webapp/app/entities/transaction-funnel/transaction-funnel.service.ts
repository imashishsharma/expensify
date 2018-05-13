import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TransactionFunnel } from './transaction-funnel.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TransactionFunnel>;

@Injectable()
export class TransactionFunnelService {

    private resourceUrl =  SERVER_API_URL + 'api/transaction-funnels';

    constructor(private http: HttpClient) { }

    create(transactionFunnel: TransactionFunnel): Observable<EntityResponseType> {
        const copy = this.convert(transactionFunnel);
        return this.http.post<TransactionFunnel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(transactionFunnel: TransactionFunnel): Observable<EntityResponseType> {
        const copy = this.convert(transactionFunnel);
        return this.http.put<TransactionFunnel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TransactionFunnel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TransactionFunnel[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransactionFunnel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TransactionFunnel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TransactionFunnel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TransactionFunnel[]>): HttpResponse<TransactionFunnel[]> {
        const jsonResponse: TransactionFunnel[] = res.body;
        const body: TransactionFunnel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TransactionFunnel.
     */
    private convertItemFromServer(transactionFunnel: TransactionFunnel): TransactionFunnel {
        const copy: TransactionFunnel = Object.assign({}, transactionFunnel);
        return copy;
    }

    /**
     * Convert a TransactionFunnel to a JSON which can be sent to the server.
     */
    private convert(transactionFunnel: TransactionFunnel): TransactionFunnel {
        const copy: TransactionFunnel = Object.assign({}, transactionFunnel);
        return copy;
    }
}
