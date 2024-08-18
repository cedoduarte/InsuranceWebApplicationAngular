import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UsersComponent } from './pages/users/users.component';
import { CarsComponent } from './pages/cars/cars.component';
import { InsurancesComponent } from './pages/insurances/insurances.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserReadComponent } from './pages/users/crud/user-read/user-read.component';
import { CarReadComponent } from './pages/cars/crud/car-read/car-read.component';

export const routes: Routes = [    
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "users",
                component: UsersComponent,
                children: [
                    {
                        path: "user-read",
                        component: UserReadComponent
                    }
                ]
            },
            {
                path: "cars",
                component: CarsComponent,
                children: [
                    {
                        path: "car-read",
                        component: CarReadComponent
                    }
                ]
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
