import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaReceptaComponent } from './nova-recepta.component';

describe('NovaReceptaComponent', () => {
  let component: NovaReceptaComponent;
  let fixture: ComponentFixture<NovaReceptaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaReceptaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovaReceptaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
