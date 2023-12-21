import { Createguildinfo } from './create-guild-info'
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CreateguildService {
  private guildsUrl = this.baseUrl + 'guilds/';
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  createGuild(guild: Createguildinfo): Observable<Createguildinfo> {

    return this.http.post<Createguildinfo>(this.guildsUrl + 'create', guild);
  }
}
