import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { ISidebarItem } from '../../shared/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  items: ISidebarItem[] = [
    {
      icon: "person",
      text: "Users"
    },
    {
      icon: "directions_car",
      text: "Cars"
    },
    {
      icon: "description",
      text: "Insurances"
    }
  ];

  ngOnInit() {
    this.router.navigate(["home/users"]);
  }

  handleItemClicked($event: any) {
    const componentName: string = $event.text.toLowerCase();
    this.router.navigate([`home/${componentName}`]);
  }
}
