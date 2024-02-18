import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ApiService} from "../services/api.service";
import {UserService} from "../services/ressources/user.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {UserModel} from "../models/user.model";
import {AvatarModule} from "primeng/avatar";
import {ToolbarModule} from "primeng/toolbar";
import {ImageModule} from "primeng/image";
import {SplitButtonModule} from "primeng/splitbutton";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
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
  ],
  standalone: true
})
export class MenuComponent {
  constructor(protected authService: AuthService,private  userService: UserService, private fb: FormBuilder) {
  }
  dropdownOpen: boolean = false;
  searchValue: string = '';
  users: UserModel[] = [];
  menuIsOpen: boolean = false;
  searchForm = this.fb.nonNullable.group({
    search: ''
  });
  protected readonly ApiService = ApiService;
  menuVertical() {
    const navbar = document.getElementById('navbar-laterale')!;
    const header = document.getElementById('header')!;
    const body = document.getElementById('content')!;

    navbar.classList.remove('w-0');
    navbar.classList.add('w-60');
    body.classList.add('brightness-60');
    header.classList.add('brightness-60');


    body.addEventListener('click', this.fermerMenu);
  }
  fermerMenu() {
    const navbar = document.getElementById('navbar-laterale')!;
    const header = document.getElementById('header')!;
    const body = document.getElementById('content')!;
    navbar.classList.add('w-0');
    navbar.classList.remove('w-60');
    body.classList.remove('brightness-60');
    header.classList.remove('brightness-60');
  }
  fetchUsers(searchValue: string){
    this.userService.getUsers(searchValue).subscribe((users: any) => {
      this.users = users;
    });
    this.dropdownOpen = true;
  }
  onSearchSubmit() {
    this.searchValue = this.searchForm.value.search ?? '';
    this.fetchUsers(this.searchValue);
  }
  @ViewChild('dropdown') dropdown: ElementRef | undefined;
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    if (this.dropdown && !this.dropdown.nativeElement.contains(event.target as Node)) {
      this.dropdownOpen = false;
    }
  }

}
