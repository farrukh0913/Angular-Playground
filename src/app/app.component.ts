import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, FormsModule, HomeComponent, DashboardComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Title123';
  name: string = '';

  setValue() {
    this.name = 'Nancy';
  }

  constructor(){
    console.log('app component! ');
    var array1: any[] = [];
    const testObject = { fname: 'ali', lname: "ali2", id: 1}
   Object.values(testObject).forEach(item => {
    array1.push(item)
  })
  }

}