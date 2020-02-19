import { async, TestBed } from '@angular/core/testing';
import { PictureModule } from './picture.module';

describe('PictureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PictureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PictureModule).toBeDefined();
  });
});
