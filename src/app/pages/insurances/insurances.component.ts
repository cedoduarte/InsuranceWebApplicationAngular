import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ICrudNavItem } from '../../shared/interfaces';
import { CrudNavComponent } from "../../components/crud-nav/crud-nav.component";

@Component({
  selector: 'app-insurances',
  standalone: true,
  imports: [RouterOutlet, CrudNavComponent],
  templateUrl: './insurances.component.html',
  styleUrl: './insurances.component.css'
})
export class InsurancesComponent {
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
    this.router.navigate([`/home/insurances/insurance-${crudItemName}`]);
  }
}
