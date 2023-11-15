import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveassignComponent } from './approveassign.component';

describe('ApproveassignComponent', () => {
  let component: ApproveassignComponent;
  let fixture: ComponentFixture<ApproveassignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApproveassignComponent]
    });
    fixture = TestBed.createComponent(ApproveassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
