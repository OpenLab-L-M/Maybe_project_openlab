import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildDetailsComponent } from './guild-details.component';

describe('GuildDetailsComponent', () => {
  let component: GuildDetailsComponent;
  let fixture: ComponentFixture<GuildDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuildDetailsComponent]
    });
    fixture = TestBed.createComponent(GuildDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
