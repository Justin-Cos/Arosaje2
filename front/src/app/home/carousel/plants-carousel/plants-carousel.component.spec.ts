import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsCarouselComponent } from './plants-carousel.component';

describe('PlantsCarouselComponent', () => {
  let component: PlantsCarouselComponent;
  let fixture: ComponentFixture<PlantsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantsCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
