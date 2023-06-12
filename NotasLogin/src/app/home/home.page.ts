import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  studentId = '';
  grade1: string | null = null;
  grade2: string | null = null;
  grade3: string | null = null;
  grade4: string | null = null;
  grade5: string | null = null;
  grades: any[] = [];
  totalGrade: number | null = null;

  constructor(private firebaseService: FirebaseService, private router: Router, private authService: AuthService) {}

  ionViewDidEnter() {
    this.getGrades();
  }

  saveGrade() {
    const grade1 = parseFloat(this.grade1 ?? '0') || 0;
    const grade2 = parseFloat(this.grade2 ?? '0') || 0;
    const grade3 = parseFloat(this.grade3 ?? '0') || 0;
    const grade4 = parseFloat(this.grade4 ?? '0') || 0;
    const grade5 = parseFloat(this.grade5 ?? '0') || 0;

    const totalGrade = grade1 + grade2 + grade3 + grade4 + grade5;

    const grades: { [name: string]: number } = {
      Grade1: grade1,
      Grade2: grade2,
      Grade3: grade3,
      Grade4: grade4,
      Grade5: grade5,
      TotalGrade: totalGrade
    };

    this.firebaseService
      .createGrades(this.studentId, grades)
      .then(() => {
        this.studentId = '';
        this.grade1 = null;
        this.grade2 = null;
        this.grade3 = null;
        this.grade4 = null;
        this.grade5 = null;
        this.totalGrade = totalGrade;

        this.getGrades();
      })
      .catch((error) => {
        console.error('Error saving grades:', error);
      });
  }


  getGrades() {
    this.firebaseService.getGrades().subscribe((grades: any[]) => {
      this.grades = grades;
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}




