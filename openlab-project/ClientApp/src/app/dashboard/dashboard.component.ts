import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { UserInfo } from '../user-info';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userDetail: UserInfo;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<UserInfo>(baseUrl + 'user').subscribe(result => {
      this.userDetail = result;
    }, error => console.error(error));
  }
}
