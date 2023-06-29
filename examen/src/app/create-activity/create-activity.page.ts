import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.page.html',
  styleUrls: ['./create-activity.page.scss'],
})
export class CreateActivityPage {
  activity: any = {};

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
  ) {}

  async onImageSelected(event: any) {
    const image = await Camera.getPhoto({
      source: CameraSource.Photos,
      resultType: CameraResultType.Base64,
    });

    // Set the image data to the activity object
    this.activity.image = image.base64String;
  }

  createActivity() {
    this.firebaseService.createActivity(this.activity).then(() => {
      this.router.navigate(['/activities']);
    });
  }
}

