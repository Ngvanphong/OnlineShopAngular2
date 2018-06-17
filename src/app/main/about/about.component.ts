
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SystemConstant } from '../../core/common/system.constant';
import { NotificationService } from '../../core/service/notification.service'
import { MessageConstant } from '../../core/common/message.constant'
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @ViewChild('addEditModal') addEditModal: ModalDirective;
  public about: any={};
  public flag:boolean=true;
  private flagInitTiny: boolean = true;
  constructor(private dataService:DataService, private notificationService:NotificationService) { }

  ngOnInit() {
    this.load();
    this.about.Content='';
  }

  private load() {
    this.dataService.get('/api/about/get').subscribe((res: any) => {
        this.about=res;       
      })
  }

  addEdit() {
    this.flag=true;
    this.addEditModal.show();
  }

  EditAbout(id:string){
    this.flag=false;
      tinymce.activeEditor.setContent(this.about.Content)
    this.addEditModal.show();
  }

  public keyupHandlerContentFooter(e: any) {
    this.about.Content = e;
  }

  public saveChanges(valid:boolean){
    if(valid){
      if(this.flag==false){
        this.dataService.put("/api/about/update",JSON.stringify(this.about)).subscribe(res=>{
          this.addEditModal.hide();
          this.notificationService.printSuccesMessage(MessageConstant.UPDATE_OK_MEG)
          this.load();
        },error=>this.dataService.handleError(error))
      }
      else{
        this.dataService.post("/api/about/add",JSON.stringify(this.about)).subscribe(res=>{
          this.addEditModal.hide();
          this.notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
          this.load();
        },error=>this.dataService.handleError(error))

      }
    }

 }



}
