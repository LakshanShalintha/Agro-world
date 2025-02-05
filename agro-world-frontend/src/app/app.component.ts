import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for the currency pipe

@Component({
  selector: 'app-root',
  standalone: true, // Indicating that this is a standalone component
  imports: [CommonModule], // Include CommonModule in the imports array
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stocks = [
    { name: 'Apple', price: 150 },
    { name: 'Tesla', price: 650 },
    { name: 'Amazon', price: 3400 }
  ];
}
