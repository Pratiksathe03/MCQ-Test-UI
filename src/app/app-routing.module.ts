import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamDashboardComponent } from './components/exam-dashboard/exam-dashboard.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'exam/:id',
    component: ExamDashboardComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
