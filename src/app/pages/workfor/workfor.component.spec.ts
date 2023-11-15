import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkforComponent } from './workfor.component';

describe('WorkforComponent', () => {
  let component: WorkforComponent;
  let fixture: ComponentFixture<WorkforComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorkforComponent]
    });
    fixture = TestBed.createComponent(WorkforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
