import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  styleUrls: ['./activity-details.page.scss'],
})
export class ActivityDetailsPage {
  activity: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ionViewWillEnter() {
    const activityId = this.route.snapshot.paramMap.get('id');
    if (activityId) {
      this.firebaseService.getActivity(activityId).then((activity) => {
        this.activity = activity;
      });
    }
  }

  goToEditActivity(activityId: string) {
    this.router.navigate(['/edit-activity', activityId]);
  }
}



