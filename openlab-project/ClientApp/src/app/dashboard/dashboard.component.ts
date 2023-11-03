import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [MatProgressBarModule, CommonModule]
})
export class DashboardComponent {
  userDetail: UserDetail;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<UserDetail>(baseUrl + 'user').subscribe(result => {
      this.userDetail = result;
    }, error => console.error(error));
  }
}

interface UserDetail {
  guildName: string;
  xp: number;
}
