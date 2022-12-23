import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeBulkloadService } from '../services/employee-bulkload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-bulkload',
  templateUrl: './employee-bulkload.component.html',
  styleUrls: ['./employee-bulkload.component.scss']
})
export class EmployeeBulkloadComponent implements OnInit {

  public progress: number;
  public message: string;
  bulkuploadResponse: any;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private bulkuploadService: EmployeeBulkloadService) { }

  ngOnInit() {
  }

  public uploadFile = (files) => {

    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();

    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(`${environment.apiUrl}playbook/`, formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.bulkuploadResponse = event.body;
          if (this.bulkuploadResponse.statusCode == 200) {
            //this.router.navigate(['pbdetail']);
          }
          else {
            alert(this.bulkuploadResponse.statusDescription)
          }
        }
      });
  }
}
