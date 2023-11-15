import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyworkDetailComponent } from './mywork-detail.component';

describe('MyworkDetailComponent', () => {
  let component: MyworkDetailComponent;
  let fixture: ComponentFixture<MyworkDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyworkDetailComponent]
    });
    fixture = TestBed.createComponent(MyworkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
