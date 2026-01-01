import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { BatchMaster } from './pages/batch-master/batch-master';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './core/guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'batch',
        component: BatchMaster,
      },
      {
        path: 'dashboard',
        component: Dashboard,
        canActivate:[authGuard]
      }
    ]
  }
];
