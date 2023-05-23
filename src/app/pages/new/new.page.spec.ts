import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MessageComponentModule } from '../message/message.module';
import { NewPage } from './new.page';

describe('NewPage', () => {
    let component: NewPage;
    let fixture: ComponentFixture<NewPage>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ NewPage ]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(NewPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });