import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TransactionFunnelComponent } from './transaction-funnel.component';
import { TransactionFunnelDetailComponent } from './transaction-funnel-detail.component';
import { TransactionFunnelPopupComponent } from './transaction-funnel-dialog.component';
import { TransactionFunnelDeletePopupComponent } from './transaction-funnel-delete-dialog.component';

export const transactionFunnelRoute: Routes = [
    {
        path: 'transaction-funnel',
        component: TransactionFunnelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensifyApp.transactionFunnel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'transaction-funnel/:id',
        component: TransactionFunnelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensifyApp.transactionFunnel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transactionFunnelPopupRoute: Routes = [
    {
        path: 'transaction-funnel-new',
        component: TransactionFunnelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensifyApp.transactionFunnel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-funnel/:id/edit',
        component: TransactionFunnelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensifyApp.transactionFunnel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-funnel/:id/delete',
        component: TransactionFunnelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensifyApp.transactionFunnel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
