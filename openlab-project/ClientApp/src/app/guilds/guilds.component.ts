import { Component, Input, OnDestroy, OnInit, signal, Pipe, PipeTransform } from '@angular/core';
import { inject,EventEmitter } from '@angular/core';
import { GuildService } from './guild.service';
import { Subject, takeUntil } from 'rxjs';
import { GuildInfo } from './guild-info';


@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css'],
})
export class GuildsComponent implements OnInit, OnDestroy {
    guildService = inject(GuildService);
  private destroy$ = new Subject<void>();
    guilds = signal<GuildInfo[]>([]);
  guild = signal<GuildInfo>(undefined);
  sSearchGuild: string = '';
  //searchGuild: EventEmitter<string> = new EventEmitter<string>();

  /*updateGuildList(event: any) {
    this.sSearchGuild = event.target.value;
  }*/

    ngOnInit(): void {
        this.guildService.getGuildList()
            .pipe(takeUntil(this.destroy$))
        .subscribe(result => this.guilds.set(result));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
  }
  /*onGuildListChanged() {
    this.searchGuild.emit();
  }*/

}
