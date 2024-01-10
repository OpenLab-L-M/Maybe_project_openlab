import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { GuildInfo } from './guild-info';
import { Observable } from 'rxjs/internal/Observable';
import { GuildDetailsInfo } from '../guild-details/guild-details-info';

@Injectable({
  providedIn: 'root'
})
export class GuildService {
  private guildsUrl = this.baseUrl + 'guilds/';
    
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    getGuildList() {
        return this.http.get<GuildInfo[]>(this.guildsUrl);
    }

    getGuildDetail(guildId: number): Observable<GuildDetailsInfo> {
        return this.http.get<GuildDetailsInfo>(this.guildsUrl + guildId);
    }

    addCurrentUserToGuild(guildId: number): Observable<GuildDetailsInfo> {
        return this.http.post<GuildDetailsInfo>(this.guildsUrl + 'join', { guildId });
    }

    leaveGuild() {
        return this.http.delete<GuildDetailsInfo>(this.guildsUrl + 'leave');
  }

  deleteGuild(guildId: number) {
    return this.http.delete<string>(this.guildsUrl + guildId);
  }
}
