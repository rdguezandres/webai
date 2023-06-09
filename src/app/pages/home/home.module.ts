import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MessageComponentModule } from '../message/message.module';
import {Firestore, getFirestore, provideFirestore} from "@angular/fire/firestore";
import { HeaderComponent } from '../../sharepages/header/header';
import { FooterComponent } from '../../sharepages/footer/footer';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MessageComponentModule,
        HomePageRoutingModule,


    ],
    declarations: [HomePage, HeaderComponent, FooterComponent],
  exports: [
    FooterComponent,
    HeaderComponent
  ]
})
export class HomePageModule {}
