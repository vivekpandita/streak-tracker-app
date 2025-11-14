import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Streak, StreakService } from '../../services/streak.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  streaks: Streak[] = [];
  loading = true;

  constructor(private streakService: StreakService, private router: Router) {}

  async ngOnInit() {
    await this.loadStreaks();
  }

  async ionViewWillEnter() {
    await this.loadStreaks();
  }

  async loadStreaks() {
    this.loading = true;
    await this.streakService.autoIncrementAll();
    this.streaks = await this.streakService.getAllStreaks();
    this.loading = false;
  }

  addStreak() {
    this.router.navigate(['/add-streak']);
  }

  viewStreak(streak: Streak) {
    this.router.navigate(['/streak-details'], { state: { streakId: streak.id } });
  }

  async deleteStreak(streak: Streak) {
    await this.streakService.deleteStreak(streak.id);
    await this.loadStreaks();
  }

  async endStreak(streak: Streak) {
    await this.streakService.endStreak(streak.id);
    await this.loadStreaks();
  }

  async restartStreak(streak: Streak) {
    await this.streakService.resetStreak(streak.id);
    await this.loadStreaks();
  }
}
