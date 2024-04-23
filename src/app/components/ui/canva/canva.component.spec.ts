import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvaComponent } from './canva.component';

describe('CanvaComponent', () => {
  let component: CanvaComponent;
  let fixture: ComponentFixture<CanvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanvaComponent]
    });
    fixture = TestBed.createComponent(CanvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
