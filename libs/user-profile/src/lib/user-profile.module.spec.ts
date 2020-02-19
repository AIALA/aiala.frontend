import { async, TestBed } from '@angular/core/testing';
import { UserProfileModule } from './user-profile.module';

describe('UserProfileModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UserProfileModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UserProfileModule).toBeDefined();
  });
});
