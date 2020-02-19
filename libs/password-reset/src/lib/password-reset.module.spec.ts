import { async, TestBed } from '@angular/core/testing';
import { PasswordResetModule } from './password-reset.module';

describe('PasswordResetModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PasswordResetModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PasswordResetModule).toBeDefined();
  });
});
