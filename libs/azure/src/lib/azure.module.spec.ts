import { async, TestBed } from '@angular/core/testing';
import { AzureModule } from './azure.module';

describe('AzureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AzureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AzureModule).toBeDefined();
  });
});
