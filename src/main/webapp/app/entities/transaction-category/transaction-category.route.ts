import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TransactionCategoryComponent } from './transaction-category.component';
import { TransactionCategoryDetailComponent } from './transaction-category-detail.component';
import { TransactionCategoryPopupComponent } from './transaction-category-dialog.component';
import { TransactionCategoryDeletePopupComponent } from './transaction-category-delete-dialog.component';

export const transactionCategoryRoute: Routes = [
    {
        path: 'transaction-category',
        component: TransactionCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensifyApp.transactionCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'transaction-category/:id',
        component: TransactionCategoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensifyApp.transactionCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transactionCategoryPopupRoute: Routes = [
    {
        path: 'transaction-category-new',
        component: TransactionCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensifyApp.transactionCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-category/:id/edit',
        component: TransactionCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensifyApp.transactionCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-category/:id/delete',
        component: TransactionCategoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensifyApp.transactionCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
