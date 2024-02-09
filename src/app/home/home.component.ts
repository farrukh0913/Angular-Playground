import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { IUser } from '../interfaces/types';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  title = 'Home Component';
  users: IUser[] = [];
  headings = ['Key', 'UserId', 'Name', 'Actions'];
  loginForm!: FormGroup;

  constructor(private readonly usersService: UsersService){
    console.log('home component! ');
  }

  ngOnInit(){
    this.loginForm = new FormGroup({
      _id: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', Validators.required)
    });
  }

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
    if(!this.loginForm.value._id){
      this.saveUser();
      this.loginForm.reset();
    }else{
      console.log('this.loginForm.value: ', this.loginForm.value);
      this.updateUserById(this.loginForm.value._id, this.loginForm.value);
      this.loginForm.reset();
    }
  }

  saveUser(){
    this.usersService.addUser('/user', { id: this.loginForm.value.id, name: this.loginForm.value.name })
    .subscribe({
      next: (addUserResponse: IUser) => {
        this.users.push({_id: addUserResponse._id, id: addUserResponse.id, name: addUserResponse.name });
        console.log('this.users: ', this.users);
      },
      error: (error: Error) => {
        console.log("error", error);
      },
    });
  }

  editUserById(key: string){
    if(key){
      var selectedUserIndex: number = (this.users).findIndex(user => user._id === key);
      this.loginForm.patchValue(this.users[selectedUserIndex]);
    }
  }

  updateUserById(key: string, userInfo: IUser) {
    this.usersService.updateUser(`/users/${key}`, userInfo)
      .subscribe({
        next: (updateUserResponse: IUser) => {
          const updatedUserIndex: number = this.users.findIndex(user => user._id === updateUserResponse._id);
          this.users[updatedUserIndex] = {_id: updateUserResponse._id, id: updateUserResponse.id, name: updateUserResponse.name};
          console.log('this.users: ', this.users);
        },
        error: (error: Error) => {
          console.log("error", error);
        },
      });
  }

  deleteUserById(key: string) {
    this.usersService.deleteUser(`/users/${key}`)
      .subscribe({
        next: (deletedUserResponse: IUser) => {
          const deletedUserIndex: number = this.users.findIndex(user => user._id === deletedUserResponse._id);
          this.users.splice(deletedUserIndex, 1);
        },
        error: (error: Error) => {
          console.log("error", error);
        },
      });
  }

}