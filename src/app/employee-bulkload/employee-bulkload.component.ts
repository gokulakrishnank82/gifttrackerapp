import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeBulkloadService } from '../services/employee-bulkload.service';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';
import { LogInIser } from '../models/loginuser';

@Component({
  selector: 'app-employee-bulkload',
  templateUrl: './employee-bulkload.component.html',
  styleUrls: ['./employee-bulkload.component.scss']
})
export class EmployeeBulkloadComponent implements OnInit {

  public progress: number;
  public message: string;
  bulkuploadResponse: any;
  currentLoginUser: LogInIser;
  statusMessage: string = '';
  isSuccess: Boolean = false;
  isFail: Boolean = false;
  downloadTemplate: string ;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private http: HttpClient,
    private router: Router,
    private bulkuploadService: EmployeeBulkloadService,
    public authenticationService: LoginService) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.downloadTemplate = `${environment.imagUrl}` + 'Resources\\Template\\SampleTemplate.xlsx';
  }

  // getBulkUploadDetails() {
  //   this.bulkuploadService.getCompany()
  //     .subscribe(data => {
  //       this.company = data;
  //     });
  // }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('createdBy', this.currentLoginUser.employeeId.toString());
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(`${environment.apiUrl}employee/bulkimport`, formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.bulkuploadResponse = event.body;
          if (this.bulkuploadResponse.statusCode == 200) {
            this.isSuccess = true;
          }
          else {
            this.isFail = true;
          }
          this.statusMessage = this.bulkuploadResponse.statusDescription
          this.ShowMessage();
        }
      });
  }

  ShowMessage() {
    setTimeout(function () {
      this.isSuccess = false;
      this.isFail = false;
    }.bind(this), 3000);
  }
}
