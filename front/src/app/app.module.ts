import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, provideHttpClient, withFetch} from "@angular/common/http";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [],
  providers: [
    provideHttpClient(withFetch()), HttpClient,
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
  ]
})
export class AppModule {
}

