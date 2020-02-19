import { async, TestBed } from '@angular/core/testing';
import { IntroModule } from './intro.module';

describe('IntroModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IntroModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(IntroModule).toBeDefined();
  });
});
