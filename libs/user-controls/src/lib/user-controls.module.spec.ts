import { async, TestBed } from '@angular/core/testing';
import { UserControlsModule } from './user-controls.module';

describe('UserControlsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UserControlsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UserControlsModule).toBeDefined();
  });
});
