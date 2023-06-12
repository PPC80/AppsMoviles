import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// import { SplashScreen } from '@capacitor/splash-screen';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  imageUrl: string | undefined;

  constructor(private storage: AngularFireStorage) {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    const imageData = image.dataUrl;
    if (imageData) {
      this.imageUrl = imageData;

      const position = await Geolocation.getCurrentPosition();
      if (position) {
        this.saveImageToFirebase(imageData, position);
      }
    }
  }

  saveImageToFirebase(imageData: string, position: GeolocationPosition) {
    const storageRef = this.storage.ref(`images/${Date.now()}.jpeg`);
    const task = storageRef.putString(imageData, 'data_url');

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          const imageUrl = storageRef.getDownloadURL();
          imageUrl.subscribe((url) => {
            if (url) {
              this.saveDataToFirestore(url, position);
            }
          });
        })
      )
      .subscribe();
  }

  saveDataToFirestore(imageUrl: string, position: GeolocationPosition) {
    firebase.firestore().collection('images').add({
      imageUrl,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
}
