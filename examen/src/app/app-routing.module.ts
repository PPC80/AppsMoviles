import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'activities',
    pathMatch: 'full',
  },
  {
    path: 'activities',
    loadChildren: () =>
      import('./activities/activities.module').then(
        (m) => m.ActivitiesPageModule
      ),
  },
  {
    path: 'activity-details/:id',
    loadChildren: () =>
      import('./activity-details/activity-details.module').then(
        (m) => m.ActivityDetailsPageModule
      ),
  },
  {
    path: 'create-activity',
    loadChildren: () =>
      import('./create-activity/create-activity.module').then(
        (m) => m.CreateActivityPageModule
      ),
  },
  {
    path: 'edit-activity/:id',
    loadChildren: () =>
      import('./edit-activity/edit-activity.module').then(
        (m) => m.EditActivityPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
