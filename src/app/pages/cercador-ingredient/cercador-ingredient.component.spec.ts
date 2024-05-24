import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CercadorIngredientComponent } from './cercador-ingredient.component';

describe('CercadorIngredientComponent', () => {
  let component: CercadorIngredientComponent;
  let fixture: ComponentFixture<CercadorIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CercadorIngredientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CercadorIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
