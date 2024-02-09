import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { IUser } from '../interfaces/types';

@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  title = 'Home Component';
  users: IUser[] = [];

  constructor(private readonly usersService: UsersService){
    console.log('home component! ');
  }

  ngOnInit(){}


  fetchUsers() {
    this.usersService
      .getUsers('/users')
      .subscribe({
        next: (response: any) => {
          this.users = response;
        },
        error: (error: Error) => {
          console.log("error", error);
        },
      });
  }

  addUser() {
    this.usersService.addUser('/user', { id: 11, name: 'TestAdmin' })
      .subscribe({
        next: (response: any) => {
          // this.users = response;
        },
        error: (error: Error) => {
          console.log("error", error);
        },
      });
  }

  updateUserById(id: string) {
    this.usersService.updateUser(`/users/${id}`, { id: 111, name: 'UpdateTestAdmin123' })
      .subscribe({
        next: (response: any) => {
          // this.users = response;
        },
        error: (error: Error) => {
          console.log("error", error);
        },
      });
  }

  deleteUserById(id: string) {
    this.usersService.deleteUser(`/users/${id}`)
      .subscribe({
        next: (response: any) => {
          console.log('deleteUser Response: ', response);
          // this.users = response;
        },
        error: (error: Error) => {
          console.log("error", error);
        },
      });
  }

}