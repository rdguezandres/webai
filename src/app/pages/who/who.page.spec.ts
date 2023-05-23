import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhoPage } from './who.page';

describe('WhoPage', () => {
  let component: WhoPage;
  let fixture: ComponentFixture<WhoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WhoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
