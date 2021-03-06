import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { NotificationService } from '../../core/service/notification.service';
import { UtilityService } from '../../core/service/utility.service';
import { AuthenService } from '../../core/service/authen.service';
import { MessageConstant } from '../../core/common/message.constant';
import { SystemConstant } from '../../core/common/system.constant';
import { UploadService } from '../../core/service/upload.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public filterCustomerName: string = '';
  public filterStartDate: string = '';
  public filterPaymentStatus: string = '';
  public filterEndDate: string = '';

  public orders: any[];
  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };
  constructor(public _authenService: AuthenService,
    private _dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService, private uploadService: UploadService) { }

  ngOnInit() {
    this.search();
  }
  public search() {
    this._dataService.get('/api/order/getlistpaging?page=' + this.pageIndex
      + '&pageSize=' + this.pageSize + '&startDate=' + this.filterStartDate
      + '&endDate=' + this.filterEndDate + '&customerName=' + this.filterCustomerName
      + '&paymentStatus=' + this.filterPaymentStatus)
      .subscribe((response: any) => {
        this.orders = response.Items;
        this.pageIndex = response.PageIndex;
        this.totalRow=response.TotalRows;
      }, error => this._dataService.handleError(error));
  }

  public reset() {
    this.filterCustomerName = '';
    this.filterEndDate = '';
    this.filterStartDate = '';
    this.filterPaymentStatus = '';
    this.search();
  }

  public delete(id: string) {
    this.notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => {
      this._dataService.delete('/api/order/delete', 'id', id).subscribe((response: any) => {
        this.notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
        this.search();
      }, error => this._dataService.handleError(error));
    });
  }
  public pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

  public changeStartDate(value: any) {
    this.filterStartDate = moment(new Date(value.end._d)).format('DD/MM/YYYY');
  }
  public changeEndDate(value: any) {
    this.filterEndDate = moment(new Date(value.end._d)).format('DD/MM/YYYY');
  }


}
