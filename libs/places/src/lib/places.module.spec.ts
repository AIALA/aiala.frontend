import { async, TestBed } from '@angular/core/testing';
import { PlacesModule } from './places.module';

describe('PlacesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlacesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlacesModule).toBeDefined();
  });
});
