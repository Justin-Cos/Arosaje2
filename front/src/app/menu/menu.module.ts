import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuComponent} from "./menu.component";
import {RouterLink} from "@angular/router";

// Import PrimeNG modules
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import {AvatarModule} from "primeng/avatar";
import {ImageModule} from "primeng/image";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [MenuComponent],
  exports: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    AvatarModule,
    ImageModule,
    ReactiveFormsModule
  ]
})
export class MenuModule { }
