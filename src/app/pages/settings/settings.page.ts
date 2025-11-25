import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage {
  darkMode = false;

  constructor() {
    // Load dark mode preference from localStorage
    const stored = localStorage.getItem('darkMode');
    this.darkMode = stored === 'true' || (stored === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.applyDarkMode();
  }

  toggleDarkMode() {
    this.applyDarkMode();
    localStorage.setItem('darkMode', this.darkMode ? 'true' : 'false');
  }

  private applyDarkMode() {
    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
