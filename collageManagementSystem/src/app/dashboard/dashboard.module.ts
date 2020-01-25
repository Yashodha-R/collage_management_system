import { NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DashboardPageRoutingModule } from "./dashboard-routing.module";

import { DashboardPage } from "./dashboard.page";
import { CourseComponent } from "./course/course.component";
import { StudentComponent } from "./student/student.component";
import { StaffComponent } from "./staff/staff.component";
import { HeaderComponent } from '../header/header.component';
import { MaterialModule } from '../material/material.module';

@NgModule({  
  imports: [
    CommonModule,
    FormsModule, 
    IonicModule, 
    DashboardPageRoutingModule, 
    MaterialModule
  ],
  declarations: [
    DashboardPage,
    CourseComponent,
    StudentComponent,
    StaffComponent,
    HeaderComponent
  ]
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardPageModule {}
