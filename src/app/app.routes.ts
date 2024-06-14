import { Routes } from '@angular/router';
import { JobDashboardComponent } from './job-dashboard/job-dashboard.component';
import { JobFavouritesComponent } from './job-favourites/job-favourites.component';
import { JobDescriptionComponent } from './job-description/job-description.component';

export const routes: Routes = [
    {path:'job-dashboard',component:JobDashboardComponent},
    {path:'job-favourites',component:JobFavouritesComponent},
    {path:'job-description/:id',component:JobDescriptionComponent},
    {path:'**',redirectTo:'job-dashboard',pathMatch:'full'}
];
