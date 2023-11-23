import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmembersComponent } from './editmembers.component';

describe('EditmembersComponent', () => {
  let component: EditmembersComponent;
  let fixture: ComponentFixture<EditmembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditmembersComponent]
    });
    fixture = TestBed.createComponent(EditmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
