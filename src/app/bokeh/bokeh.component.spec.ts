/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BokehComponent } from './bokeh.component';

describe('BokehComponent', () => {
  let component: BokehComponent;
  let fixture: ComponentFixture<BokehComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BokehComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BokehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
