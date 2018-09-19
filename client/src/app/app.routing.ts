import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TrainingsComponent } from './home/trainings/trainings.component';
import { ReviewsComponent } from './home/reviews/reviews.component';
import { ServicesComponent } from './home/services/services.component';
import { ShowPostComponent } from './home/posts/show-post/show-post.component';

export const AppRoutes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'home', component:HomeComponent, children: [
        { path: 'trainings', component: TrainingsComponent, children: []},
        { path: 'reviews', component: ReviewsComponent, children: [] },
        { path: 'services', component: ServicesComponent, children: []},
        { path: 'blog', component: ShowPostComponent, children: []}
    ]},
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);