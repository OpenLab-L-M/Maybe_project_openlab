import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css'],
  imports: [ReactiveFormsModule],
})
export class CreateGuildComponent {
  profileForm = new FormGroup({
    name: new FormControl(''),
    desc: new FormControl(''),
    mmc: new FormControl(''),
  });
  
  /*createGuild() {
    console.warn(this.name.value);
    console.warn(this.desc.value);
    console.warn(this.mmc.value);
  }*/

  onSubmit() {
    console.warn(this.profileForm.value);
  }
}


