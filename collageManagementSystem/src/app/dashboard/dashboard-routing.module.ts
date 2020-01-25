import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './course/course.component';
import { StudentComponent } from './student/student.component';
import { StaffComponent } from './staff/staff.component';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'course',
    component: CourseComponent
  },
  {
    path: 'student',
    component: StudentComponent
  },
  {
    path: 'staff',
    component: StaffComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
