/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CubeBComponent } from './cube-b.component';

describe('CubeBComponent', () => {
  let component: CubeBComponent;
  let fixture: ComponentFixture<CubeBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CubeBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CubeBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
