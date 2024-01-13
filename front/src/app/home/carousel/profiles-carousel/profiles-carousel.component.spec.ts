import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesCarouselComponent } from './profiles-carousel.component';

describe('ProfilesCarouselComponent', () => {
  let component: ProfilesCarouselComponent;
  let fixture: ComponentFixture<ProfilesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilesCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
