import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ApiService} from "../services/api.service";
import {UserService} from "../services/ressources/user.service";
import {FormBuilder} from "@angular/forms";
import {UserModel} from "../models/user.model";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(protected authService: AuthService,private  userService: UserService, private fb: FormBuilder) {
  }
  dropdownOpen: boolean = false;
  searchValue: string = '';
  users: UserModel[] = [];
  searchForm = this.fb.nonNullable.group({
    search: ''
  });
  protected readonly ApiService = ApiService;
  menuVertical() {
    const navbar = document.getElementById('navbar-laterale')!;
    const fixe = document.getElementById('fixe')!;
    const body = document.getElementById('content')!;

    navbar.classList.remove('w-0');
    navbar.classList.add('w-60');
    body.classList.add('brightness-60');
    fixe.classList.add('brightness-60');

    body.addEventListener('click', function () {
      navbar.classList.add('w-0');
      navbar.classList.remove('w-60');
      body.classList.remove('brightness-60');
      fixe.classList.remove('brightness-60');
    });
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

}
