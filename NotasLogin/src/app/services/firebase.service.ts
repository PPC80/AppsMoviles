import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private afDatabase: AngularFireDatabase) {}

  createGrades(studentId: string, grades: { [name: string]: number }) {
    return this.afDatabase.object(`grades/${studentId}`).set(grades);
  }

  getGrades() {
    return this.afDatabase.list('grades').valueChanges();
  }
}

