import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StreakService, Streak, StreakType } from '../../services/streak.service';

@Component({
  selector: 'app-add-streak',
  templateUrl: './add-streak.page.html',
  styleUrls: ['./add-streak.page.scss'],
  standalone: false,
})
export class AddStreakPage {
  name = '';
  type: StreakType = 'manual';
  startDate: string = new Date().toISOString().substring(0, 10);
  creating = false;

  constructor(private streakService: StreakService, private router: Router) {}

  async addStreak() {
    if (!this.name.trim()) return;
    this.creating = true;
    const now = new Date();
    const streak: Streak = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      name: this.name.trim(),
      type: this.type,
      count: this.type === 'manual' ? 0 : this.calculateAutoCount(),
      startDate: this.type === 'manual' ? now.toISOString() : new Date(this.startDate).toISOString(),
      lastUpdated: now.toISOString(),
      isActive: true,
      history: [],
    };
    streak.history.push({
      date: streak.startDate,
      value: streak.count,
      action: 'reset',
    });
    await this.streakService.addStreak(streak);
    this.creating = false;
    this.router.navigate(['/home']);
  }

  calculateAutoCount(): number {
    const start = new Date(this.startDate);
    const now = new Date();
    return Math.max(0, Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  }
}
