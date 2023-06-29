import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.page.html',
  styleUrls: ['./edit-activity.page.scss'],
})
export class EditActivityPage {
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

  updateActivity() {
    if (this.activity && this.activity.id) {
      this.firebaseService
        .updateActivity(this.activity.id, this.activity)
        .then(() => {
          this.router.navigate(['/activities']);
        });
    }
  }
}

