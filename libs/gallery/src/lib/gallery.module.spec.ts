import { async, TestBed } from '@angular/core/testing';
import { GalleryModule } from './gallery.module';

describe('GalleryModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GalleryModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(GalleryModule).toBeDefined();
  });
});
