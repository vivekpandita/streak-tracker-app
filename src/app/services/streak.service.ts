import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export type StreakType = 'manual' | 'automatic';

export interface StreakHistoryEntry {
  date: string; // ISO string
  value: number;
  action: 'increment' | 'reset' | 'end' | 'auto-increment';
}

export interface Streak {
  id: string;
  name: string;
  type: StreakType;
  count: number;
  startDate: string; // ISO string
  lastUpdated: string; // ISO string
  isActive: boolean;
  history: StreakHistoryEntry[];
}

@Injectable({ providedIn: 'root' })
export class StreakService {
  private _storage: Storage | null = null;
  private STORAGE_KEY = 'streaks';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getAllStreaks(): Promise<Streak[]> {
    return (await this._storage?.get(this.STORAGE_KEY)) || [];
  }

  async saveAllStreaks(streaks: Streak[]): Promise<void> {
    await this._storage?.set(this.STORAGE_KEY, streaks);
  }

  async addStreak(streak: Streak): Promise<void> {
    const streaks = await this.getAllStreaks();
    streaks.push(streak);
    await this.saveAllStreaks(streaks);
  }

  async updateStreak(updated: Streak): Promise<void> {
    const streaks = await this.getAllStreaks();
    const idx = streaks.findIndex(s => s.id === updated.id);
    if (idx > -1) {
      streaks[idx] = updated;
      await this.saveAllStreaks(streaks);
    }
  }

  async deleteStreak(id: string): Promise<void> {
    let streaks = await this.getAllStreaks();
    streaks = streaks.filter(s => s.id !== id);
    await this.saveAllStreaks(streaks);
  }

  async incrementStreak(id: string): Promise<void> {
    const streaks = await this.getAllStreaks();
    const streak = streaks.find(s => s.id === id);
    if (streak && streak.isActive) {
      streak.count++;
      streak.lastUpdated = new Date().toISOString();
      streak.history.push({
        date: streak.lastUpdated,
        value: streak.count,
        action: streak.type === 'manual' ? 'increment' : 'auto-increment',
      });
      await this.updateStreak(streak);
    }
  }

  async resetStreak(id: string): Promise<void> {
    const streaks = await this.getAllStreaks();
    const streak = streaks.find(s => s.id === id);
    if (streak) {
      streak.count = 0;
      streak.isActive = true;
      streak.startDate = new Date().toISOString();
      streak.lastUpdated = streak.startDate;
      streak.history.push({
        date: streak.lastUpdated,
        value: 0,
        action: 'reset',
      });
      await this.updateStreak(streak);
    }
  }

  async endStreak(id: string): Promise<void> {
    const streaks = await this.getAllStreaks();
    const streak = streaks.find(s => s.id === id);
    if (streak && streak.isActive) {
      streak.isActive = false;
      streak.lastUpdated = new Date().toISOString();
      streak.history.push({
        date: streak.lastUpdated,
        value: streak.count,
        action: 'end',
      });
      await this.updateStreak(streak);
    }
  }

  async autoIncrementAll(): Promise<void> {
    const streaks = await this.getAllStreaks();
    const now = new Date();
    let changed = false;
    for (const streak of streaks) {
      if (streak.type === 'automatic' && streak.isActive) {
        const start = new Date(streak.startDate);
        const days = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        if (days !== streak.count) {
          streak.count = days;
          streak.lastUpdated = now.toISOString();
          streak.history.push({
            date: streak.lastUpdated,
            value: streak.count,
            action: 'auto-increment',
          });
          changed = true;
        }
      }
    }
    if (changed) {
      await this.saveAllStreaks(streaks);
    }
  }
}
