import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { IUser } from '../interfaces/types';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [GraphqlService]
})

export class HomeComponent {
  title = 'Home Component';
  users: IUser[] = [];
  headings = ['Key', 'UserId', 'Name', 'Actions'];
  userForm!: FormGroup;

  constructor(private readonly usersService: UsersService, private readonly graphqlService: GraphqlService) {
    console.log('home component! ');
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      _id: new FormControl(''),
      id: new FormControl('', Validators.required),
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

  fetchUsersByGQL() {
    this.graphqlService.getUsers().subscribe((users: IUser[]) => {
      if (users.length) {
        this.users = [...users];
        console.log('this.users: ', this.users);
      }
    })
  }

  addUser() {
    if (!this.userForm.value._id) {
      this.saveUser();
      this.userForm.reset();
    } else {
      console.log('this.userForm.value: ', this.userForm.value);
      this.updateUserById(this.userForm.value._id, this.userForm.value);
      this.userForm.reset();
    }
  }

  saveUser() {
    this.usersService.addUser('/user', { id: this.userForm.value.id, name: this.userForm.value.name })
      .subscribe({
        next: (addUserResponse: IUser) => {
          this.users.push({ _id: addUserResponse._id, id: addUserResponse.id, name: addUserResponse.name });
          console.log('this.users: ', this.users);
        },
        error: (error: Error) => {
          console.log("error", error);
        },
      });
  }

  editUserById(key: string) {
    if (key) {
      var selectedUserIndex: number = (this.users).findIndex(user => user._id === key);
      this.userForm.patchValue(this.users[selectedUserIndex]);
    }
  }

  updateUserById(key: string, userInfo: IUser) {
    this.usersService.updateUser(`/users/${key}`, userInfo)
      .subscribe({
        next: (updateUserResponse: IUser) => {
          const updatedUserIndex: number = this.users.findIndex(user => user._id === updateUserResponse._id);
          this.users[updatedUserIndex] = { _id: updateUserResponse._id, id: updateUserResponse.id, name: updateUserResponse.name };
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

  downloadAndOpenFile() {
    const data = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
    const filename = 'hello.txt';
    const url = URL.createObjectURL(data);
    saveAs(data, filename);
  }

  downloadAndOpenInNewTab(): void {
    const data = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
    const filename = 'hello.txt';
    const url = URL.createObjectURL(data);
    const newTab = window.open(url, '_blank');
    saveAs(data, filename);
    if (newTab) {
      newTab.addEventListener('unload', () => {
        URL.revokeObjectURL(url);
      });
    }
  }

}