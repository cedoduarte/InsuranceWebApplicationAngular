import { Component, input } from '@angular/core';
import { ISidebarItem } from '../../shared/interfaces';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  items = input<ISidebarItem[]>([]);
}
