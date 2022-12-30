import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeBulkloadService } from '../services/employee-bulkload.service';
import { BulkuploadHistory } from '../models/bulkupload-history';
import { BulkuploadEmployeeHistory } from '../models/bulkupload-employee-history'
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
  downloadTemplate: string;
  bulkuploadHistory: BulkuploadHistory[] = [];
  bulkuploadEmployeeHistory: BulkuploadEmployeeHistory[] = [];
  showModal = false;

  @Output() public onUploadFinished = new EventEmitter();
  @ViewChild('file') fileUploader: ElementRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    private bulkuploadService: EmployeeBulkloadService,
    public authenticationService: LoginService) {
  }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser === null || this.currentLoginUser === undefined) {
      this.router.navigate(['login']);
      return;
    }
    this.downloadTemplate = `${environment.templatedownloadUrl}`;
    this.getBulkUploadDetails();
  }

  getBulkUploadDetails() {
    this.bulkuploadService.getBulkUploadHitoryByCompanyId(this.currentLoginUser.companyId)
      .subscribe(data => {
        this.bulkuploadHistory = data;
        console.log(data)
      });
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('createdBy', this.currentLoginUser.employeeId.toString());
    formData.append('companyId', this.currentLoginUser.companyId.toString());
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
            this.getBulkUploadDetails();
            this.progress = 0;
            this.message = ''
            this.fileUploader.nativeElement.value = null;
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

  employeeDetail(employeeHeaderId) {
    this.getBulkUploadEmployeeDetails(employeeHeaderId)
    this.showModal = !this.showModal;
  }
  closeModal() {
    this.showModal = !this.showModal;
  }

  getBulkUploadEmployeeDetails(employeeHeaderId: number) {
    this.bulkuploadService.getEmployeeHitoryByHeaderId(employeeHeaderId)
      .subscribe(data => {
        this.bulkuploadEmployeeHistory = data;
        console.log(data)
      });
  }
}
