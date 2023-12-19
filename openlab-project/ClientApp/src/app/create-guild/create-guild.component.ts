import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css'],
  imports: [ReactiveFormsModule],
})
export class CreateGuildComponent {
  name = new FormControl('');
  desc = new FormControl('');
  mmc = new FormControl('');
  
  createGuild() {
    console.log('Guild Name:', this.name.value);
    console.log('Guild Description:', this.desc.value);
    console.log('Max Member Count:', this.mmc.value);
  }
}


