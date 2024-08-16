import { Component, input, output } from '@angular/core';
import { ICrudNavItem } from '../../shared/interfaces';

@Component({
  selector: 'app-crud-nav',
  standalone: true,
  imports: [],
  templateUrl: './crud-nav.component.html',
  styleUrl: './crud-nav.component.css'
})
export class CrudNavComponent {
  items = input<ICrudNavItem[]>([]);
  itemClicked = output<ICrudNavItem>();

  handleClick($event: any) {
    this.itemClicked.emit($event);
  }
}
