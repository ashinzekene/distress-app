import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistressComponent } from './distress.component';

describe('DistressComponent', () => {
  let component: DistressComponent;
  let fixture: ComponentFixture<DistressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
