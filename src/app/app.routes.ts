import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [    
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        component: PageNotFoundComponent
    },
];
