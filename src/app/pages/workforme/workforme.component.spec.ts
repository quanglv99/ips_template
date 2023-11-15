import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkformeComponent } from './workforme.component';

describe('WorkformeComponent', () => {
  let component: WorkformeComponent;
  let fixture: ComponentFixture<WorkformeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorkformeComponent]
    });
    fixture = TestBed.createComponent(WorkformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
