import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
//import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { SplashScreen } from '@ionic-native/splash-screen';
//import { StatusBar } from '@ionic-native/status-bar';
 
import { AppComponent } from './app.component';
//import { HomePage } from '../pages/home/home';
import { AppRoutingModule } from './app-routing.module';
 
import { HealthKit } from '@ionic-native/health-kit';
 
@NgModule({
  declarations: [
    AppComponent,
    AppRoutingModule
  ],
  imports: [
    BrowserModule,
   // IonicModule.forRoot(AppComponent)
  ],
  //bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    AppRoutingModule
  ],
  providers: [
   //StatusBar,
    //SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //HealthKit
  ]
})
export class AppModule {} 