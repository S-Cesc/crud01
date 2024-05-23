import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptesComponent } from './receptes.component';

describe('ReceptesComponent', () => {
  let component: ReceptesComponent;
  let fixture: ComponentFixture<ReceptesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
