import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyassignComponent } from './myassign.component';

describe('MyassignComponent', () => {
  let component: MyassignComponent;
  let fixture: ComponentFixture<MyassignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyassignComponent]
    });
    fixture = TestBed.createComponent(MyassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
