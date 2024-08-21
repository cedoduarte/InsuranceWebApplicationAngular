import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CrudNavComponent } from '../../components/crud-nav/crud-nav.component';
import { ICrudNavItem } from '../../shared/interfaces';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [RouterOutlet, CrudNavComponent],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {
  router = inject(Router);
  items: ICrudNavItem[] = [
    {
      text: "Read"
    },
    {
      text: "New"
    }
  ];

  handleItemClicked($event: any) {
    const crudItemName: string = $event.text.toLowerCase();
    this.router.navigate([`/home/cars/car-${crudItemName}`]);
  }
}
