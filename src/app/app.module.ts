import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {Firestore, getFirestore, provideFirestore} from "@angular/fire/firestore";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { NewPage } from './pages/new/new.page';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { FavoritesPage } from './pages/fav/fav.page';
import {HomePageModule} from "./pages/home/home.module";




@NgModule({
  declarations: [AppComponent, NewPage, FavoritesPage],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        FormsModule, HomePageModule,
    ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
