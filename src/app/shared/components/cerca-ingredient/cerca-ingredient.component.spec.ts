import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CercaIngredientComponent } from './cerca-ingredient.component';

describe('CercaIngredientComponent', () => {
  let component: CercaIngredientComponent;
  let fixture: ComponentFixture<CercaIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CercaIngredientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CercaIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
