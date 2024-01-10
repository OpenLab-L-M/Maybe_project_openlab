import { CreateguildService } from './create-guild-service.service'
import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GuildService } from '../guilds/guild.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Createguildinfo } from './create-guild-info';
import { Router } from '@angular/router'

@Component({
  standalone: true,
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css'],
  imports: [ReactiveFormsModule],
})
export class CreateGuildComponent {
  newGuild = signal<Createguildinfo>(undefined);
  constructor(private guildService: CreateguildService, private router: Router) { }
  profileForm = new FormGroup({
    name: new FormControl(''),
    desc: new FormControl(''),
    mmc: new FormControl(''),
  });
  private destroy$ = new Subject<void>();

  /*createGuild() {
    console.warn(this.name.value);
    console.warn(this.desc.value);
    console.warn(this.mmc.value);
  }*/

  onSubmit() {
    console.warn(this.profileForm.value);
    this.createGuild();
  }
  private createGuild() {
    this.guildService.createGuild({
      guildName: this.profileForm.controls['name'].value,
      guildDescription: this.profileForm.controls['desc'].value,
      guildMaxCapacity: this.profileForm.controls['mmc'].value })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/guilds']));
  }


}
