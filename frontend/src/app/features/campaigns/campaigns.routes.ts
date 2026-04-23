import { Routes } from '@angular/router';

export const CAMPAIGNS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/campaign-list/campaign-list.component').then(m => m.CampaignListComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/campaign-create/campaign-create.component').then(m => m.CampaignCreateComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/campaign-detail/campaign-detail.component').then(m => m.CampaignDetailComponent),
  },
];
