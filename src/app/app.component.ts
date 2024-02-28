import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../graphql.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HttpClientModule, HomeComponent, DashboardComponent, GraphQLModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})

export class AppComponent {
  title = 'Title123';
  name: string = '';

  setValue() {
    this.name = 'Nancy';
  }

  constructor() {
    console.log('app component! ');
    var array1: any[] = [];
    const testObject = { fname: 'ali', lname: "ali2", id: 1 }
    Object.values(testObject).forEach(item => {
      array1.push(item)
    })
  }

  ngOnInit() { }
}