import { Component, OnInit } from '@angular/core';
import { FocusService } from '../../../services/focus.service';
import { ProductList } from '../../../models/product-list';

@Component({
  selector: 'app-create-focus',
  templateUrl: './create-focus.component.html',
  styles: []
})
export class CreateFocusComponent implements OnInit {
  loading: boolean = false;
  alerts: any = [];
  nama_focus: string = '';

  constructor(private focusService: FocusService) { } 

  ngOnInit() {
  }

  showAlertSuccess(resp: string): void {
    this.alerts.push({
      type: 'success',
      msg: resp,
      timeout: 5000
    });
  }

  showAlertError(resp: string): void {
    this.alerts.push({
      type: 'danger',
      msg: resp,
      timeout: 5000
    });
  }

  createFocus(){
    this.loading = true;
    this.focusService.createFocus(this.nama_focus)
      .subscribe(msg => {
        this.nama_focus = ''
        this.showAlertSuccess(msg.error_msg);
        this.loading = false;
      },
      err => {
        console.log(err);
        this.showAlertError(err);
        this.loading = false;
      }
    );
  }

}
