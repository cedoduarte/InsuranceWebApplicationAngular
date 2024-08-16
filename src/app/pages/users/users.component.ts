import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ICrudNavItem } from '../../shared/interfaces';
import { CrudNavComponent } from '../../components/crud-nav/crud-nav.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet, CrudNavComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  router = inject(Router);
  items: ICrudNavItem[] = [
    {
      text: "Read"
    },
    {
      text: "Statistics"
    }
  ];

  handleItemClicked($event: any) {
    const crudItemName: string = $event.text.toLowerCase();
    this.router.navigate([`/home/users/user-${crudItemName}`]);
  }
}
