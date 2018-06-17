import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import {RouterModule,Routes} from'@angular/router'
import {DataService} from '../../core/service/data.service';
import {NotificationService} from '../../core/service/notification.service';
import {FormsModule} from '@angular/forms' ;
import {ModalModule} from 'ngx-bootstrap';
import{SimpleTinyModule} from '../../share/simple-tiny/simple-tiny.module'
import { EditorModule } from '@tinymce/tinymce-angular';
const aboutRouter:Routes=[
  {path:'',redirectTo:'index', pathMatch:'full'},
  {path:'index',component:AboutComponent},
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(aboutRouter),
    FormsModule,
    ModalModule.forRoot(),
    EditorModule,
    SimpleTinyModule,
  ],
  providers:[
    DataService,
    NotificationService
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
