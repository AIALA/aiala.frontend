import { async, TestBed } from '@angular/core/testing';
import { UserManagementModule } from './user-management.module';

describe('UserManagementModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UserManagementModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UserManagementModule).toBeDefined();
  });
});
