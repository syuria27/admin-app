import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FocusService } from '../../../services/focus.service';
import { FocusList } from '../../../models/focus-list';

@Component({
  selector: 'app-edit-Focus',
  templateUrl: './edit-Focus.component.html',
  styles: []
})
export class EditFocusComponent implements OnInit {
  focusList: FocusList = {
    kode_focus: '',
    nama_focus: '',
    status: 0
  }

  loading: boolean = false;
  loadingFocus: boolean = false;
  errorMessage: string = '';
  errorUpdate: string = '';
  successUpdate: string = '';

  constructor(private focusService: FocusService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getFocus();
  }

  updateData(){
    this.loading = true;
    this.focusService.updateFocus(this.focusList.kode_focus, this.focusList.nama_focus)
      .subscribe(
        data => {
          console.log(data);
          this.successUpdate = data.error_msg;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.errorUpdate = err;
          this.loading = false;
        }
      );
  }

  nonActive(){
    this.loading = true;
    this.focusService.updateStatus(this.focusList.kode_focus,0)
      .subscribe(
        data => {
          console.log(data);
          this.focusList.status = 0;
          this.successUpdate = data.error_msg;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.errorUpdate = err;
          this.loading = false;
        }
      );
  }

  active(){
    this.loading = true;
    this.focusService.updateStatus(this.focusList.kode_focus,1)
      .subscribe(
        data => {
          console.log(data);
          this.focusList.status = 1;
          this.successUpdate = data.error_msg;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.errorUpdate = err;
          this.loading = false;
        }
      );
  }

  getFocus(){
    this.loadingFocus = true;
    let kode_focus = this.route.snapshot.params['kode_focus'];
    this.focusService.getFocus(kode_focus)
      .subscribe(
        prd => {
          console.log(prd);
          this.focusList = prd;
          this.loadingFocus = false;
        },error =>{
           this.errorMessage = error;
           this.loadingFocus = false;
        }
      );
  }

}
