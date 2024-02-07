import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {}