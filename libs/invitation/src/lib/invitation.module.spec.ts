import { async, TestBed } from '@angular/core/testing';
import { InvitationModule } from './invitation.module';

describe('InvitationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [InvitationModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(InvitationModule).toBeDefined();
  });
});
