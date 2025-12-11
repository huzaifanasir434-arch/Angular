// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { Login } from './login/login';
import { Register } from './register/register';
import { Contact } from './contact/contact';
import { About } from './about/about';
import { Home } from './home/home';
import { MedicalForm } from './medical-form/medical-form';
import { ClaimFormComponent } from './claim-form/claim-form';
import { ViewClaim } from './view-claim/view-claim';
import { MedicalArray } from './form-array/form-array';



export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'medical-form',
        component: MedicalForm,
      },
      {
        path: 'claim-form',
        component: ClaimFormComponent,
      },
      {
        path: 'view-claim',
        component: ViewClaim,
      },
         {
        path: 'view-claim',
        component: ViewClaim,
      },
      {
        path: 'form-array',
        component: MedicalArray,
      },
      {
        path: 'about',
        component: About
      },
      {
        path: 'contact',
        component: Contact
      }
    ]
  },
  {
    path: 'login',
    component: Login

  },
  {
    path: 'register',
    component: Register
  },
];
