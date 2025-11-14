import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Streak, StreakService } from '../../services/streak.service';

@Component({
  selector: 'app-streak-details',
  templateUrl: './streak-details.page.html',
  styleUrls: ['./streak-details.page.scss'],
  standalone: false,
})
export class StreakDetailsPage implements OnInit {
  streak: Streak | undefined;
  loading = true;
  incrementing = false;

  constructor(private streakService: StreakService, private router: Router) {}

  async ngOnInit() {
    await this.loadStreak();
  }

  async loadStreak() {
    const nav = window.history.state;
    const id = nav.streakId;
    if (!id) {
      this.router.navigate(['/home']);
      return;
    }
    const streaks = await this.streakService.getAllStreaks();
    this.streak = streaks.find(s => s.id === id);
    this.loading = false;
  }

  async increment() {
    if (!this.streak || !this.streak.isActive) return;
    this.incrementing = true;
    await this.streakService.incrementStreak(this.streak.id);
    await this.loadStreak();
    this.incrementing = false;
  }
}
