import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenreCardComponent } from './components/genre-card/genre-card.component';
import { GenrePageComponent } from './components/genre-page/genre-page.component';
import { StandardCasePipe } from './pipes/standard-case.pipe';
import { BookCardComponent } from './components/book-card/book-card.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { TooltipDirective } from './directives/tooltip.directive';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    GenreCardComponent,
    GenrePageComponent,
    StandardCasePipe,
    BookCardComponent,
    EllipsisPipe,
    TooltipDirective,
    HomePageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
