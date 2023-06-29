import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { firebaseConfig } from '../firebase.config';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db: firebase.firestore.Firestore;
  private storage: firebase.storage.Storage;

  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
    this.storage = firebase.storage();

  }


  getAllActivities(): Promise<any[]> {
    return this.db
      .collection('activities')
      .get()
      .then((querySnapshot) => {
        const activities: any[] = [];
        querySnapshot.forEach((doc) => {
          activities.push({ id: doc.id, ...doc.data() });
        });
        return activities;
      });
  }

  getActivity(activityId: string): Promise<any> {
    return this.db
      .collection('activities')
      .doc(activityId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return { id: doc.id, ...doc.data() };
        } else {
          return null;
        }
      });
  }

  createActivity(activity: any): Promise<any> {
    return this.db.collection('activities').add(activity);
  }

  updateActivity(activityId: string, updatedData: any): Promise<void> {
    return this.db.collection('activities').doc(activityId).update(updatedData);
  }

  deleteActivity(activityId: string): Promise<void> {
    return this.db.collection('activities').doc(activityId).delete();
  }

  uploadImage(imageData: string, imageName: string): Promise<string> {
    const imageRef = this.storage.ref().child(`images/${imageName}`);
    const uploadTask = imageRef.putString(imageData, 'data_url');
    return uploadTask.then(() => imageRef.getDownloadURL());
  }
}
