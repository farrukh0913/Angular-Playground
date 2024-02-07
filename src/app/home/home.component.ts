import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  title = 'Home Component';

  constructor(private readonly productsService: ProductsService){
    console.log('home component! ');
  }

  ngOnInit(){}


  fetchProducts() {
    this.productsService
      .getProducts('http://localhost:3000/api/user')
      .subscribe({
        next: (data: any) => {
          console.log('todos: ', data);
        },
        error: (error: Error) => {
          console.log("error", error);
        },
      });
  }

}