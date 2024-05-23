import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouIngredientComponent } from './nou-ingredient.component';

describe('NouIngredientComponent', () => {
  let component: NouIngredientComponent;
  let fixture: ComponentFixture<NouIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouIngredientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
