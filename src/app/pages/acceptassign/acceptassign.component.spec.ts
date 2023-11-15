import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptassignComponent } from './acceptassign.component';

describe('AcceptassignComponent', () => {
  let component: AcceptassignComponent;
  let fixture: ComponentFixture<AcceptassignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AcceptassignComponent]
    });
    fixture = TestBed.createComponent(AcceptassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
