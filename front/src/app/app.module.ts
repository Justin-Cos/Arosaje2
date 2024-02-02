import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [],
  providers:[
      provideHttpClient(),HttpClient
      ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
  ]
})
export class AppModule { }

