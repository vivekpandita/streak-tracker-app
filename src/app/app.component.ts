import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home-outline' },
    { title: 'Settings', url: '/settings', icon: 'settings-outline' },
    { title: 'About', url: '/about', icon: 'information-circle-outline' },
  ];
  constructor() {}
}
