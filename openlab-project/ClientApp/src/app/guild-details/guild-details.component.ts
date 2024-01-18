import { Component, Input, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GuildService } from '../guilds/guild.service';
import { GuildDetailsInfo } from './guild-details-info';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserInfo } from '../user-info';

@Component({
    selector: 'app-guild-details',
    templateUrl: './guild-details.component.html',
    styleUrls: ['./guild-details.component.css'],
})
export class GuildDetailsComponent implements OnInit, OnDestroy {
    authService = inject(AuthorizeService);
    guildService = inject(GuildService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  searchGuild: string;

    @Input('guildId') guildIdFromRoute: number;
    private destroy$ = new Subject<void>();

  guildMembersDataSource: MatTableDataSource<UserInfo>;
  guildDetail = signal<GuildDetailsInfo>(undefined);
  private user = toSignal(this.authService.getUser());
  isUserInGuild = computed(() => !!this.guildDetail()?.members.find(member => member.name === this.user().name));

  constructor() {
    effect(() => { if (this.guildDetail()) this.guildMembersDataSource = new MatTableDataSource });
  }

    ngOnInit(): void {
        if (this.guildIdFromRoute) {
            this.guildService.getGuildDetail(this.guildIdFromRoute)
                .pipe(takeUntil(this.destroy$))
                .subscribe(guildDetail => this.guildDetail.set(guildDetail));
        }
    }

    joinGuild(): void {
        this.guildService.addCurrentUserToGuild(this.guildIdFromRoute)
            .pipe(takeUntil(this.destroy$))
            .subscribe((guildDetail: GuildDetailsInfo) =>
                this.setDetailAndShowSnack(guildDetail, 'You have been added to the guild!', 'Something went wrong! Probably, you already are member of a guild.'));
    }

    leaveGuild() {
        this.guildService.leaveGuild()
            .pipe(takeUntil(this.destroy$))
            .subscribe((guildDetail: GuildDetailsInfo) =>
                this.setDetailAndShowSnack(guildDetail, 'You have been removed from the guild!', 'Something went wrong!'));
    }

  deleteBtn() {
    this.guildService.deleteGuild(this.guildIdFromRoute)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/guilds']));
    }

    private setDetailAndShowSnack(guildDetail: GuildDetailsInfo, successMessage: string, failMessage: string) {
        if (guildDetail) {
            this.guildDetail.set(guildDetail);
            this.showSnack(successMessage);
        }
        else {
            this.showSnack(failMessage);
        }
    }

    private showSnack(message: string) {
        this.snackBar.open(message, null, {duration: 3000});
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
