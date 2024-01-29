import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, provideHttpClient} from "@angular/common/http";



@NgModule({
  declarations: [],
  providers:[
      provideHttpClient(),HttpClient
      ],
  imports: [
    CommonModule
  ]
})
export class AppModule { }
