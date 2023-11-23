/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardsprodutosComponent } from './cardsprodutos.component';

describe('CardsprodutosComponent', () => {
  let component: CardsprodutosComponent;
  let fixture: ComponentFixture<CardsprodutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsprodutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsprodutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
