import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemoPage } from './create-memo.page';

describe('CreateMemoPage', () => {
  let component: CreateMemoPage;
  let fixture: ComponentFixture<CreateMemoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMemoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
