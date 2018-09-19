import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RootComponent } from './root/root.component';
import { ROUTING } from './app.routing';
import {LoginComponent} from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ShowPostComponent } from './home/posts/show-post/show-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { TrainingsComponent } from './home/trainings/trainings.component'
import { ReviewsComponent } from './home/reviews/reviews.component';
import { ServicesComponent } from './home/services/services.component';

@NgModule({
  declarations: [
    RootComponent,
    LoginComponent,
    HomeComponent,
    ShowPostComponent,
    AddPostComponent,
    TrainingsComponent,
    ReviewsComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    ROUTING,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
