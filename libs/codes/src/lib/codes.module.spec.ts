import { async, TestBed } from '@angular/core/testing';
import { CodesModule } from './codes.module';

describe('CodesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CodesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CodesModule).toBeDefined();
  });
});
