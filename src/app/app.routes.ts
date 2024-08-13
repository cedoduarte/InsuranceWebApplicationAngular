import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UsersComponent } from './pages/users/users.component';
import { CarsComponent } from './pages/cars/cars.component';
import { InsurancesComponent } from './pages/insurances/insurances.component';

export const routes: Routes = [    
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "users",
                component: UsersComponent
            },
            {
                path: "cars",
                component: CarsComponent
            },
            {
                path: "insurances",
                component: InsurancesComponent
            }
        ]
    },
    {
        path: "**",
        component: PageNotFoundComponent
    },
];
