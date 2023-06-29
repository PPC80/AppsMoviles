import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage {
  activities!: any[];

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ionViewWillEnter() {
    this.firebaseService.getAllActivities().then((activities) => {
      this.activities = activities;
    });
  }

  goToActivityDetails(activityId: string) {
    this.router.navigate(['/activity-details', activityId]);
  }

  goToCreateActivity() {
    this.router.navigate(['/create-activity']);
  }

  goToEditActivity(activityId: string) {
    this.router.navigate(['/edit-activity', activityId]);
  }

  deleteActivity(activityId: string) {
    this.firebaseService.deleteActivity(activityId);
  }
}
