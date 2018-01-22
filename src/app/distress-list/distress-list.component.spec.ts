import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistressListComponent } from './distress-list.component';

describe('DistressListComponent', () => {
  let component: DistressListComponent;
  let fixture: ComponentFixture<DistressListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistressListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
