import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite'
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ModalLancamentosPage } from './../pages/modal-lancamentos/modal-lancamentos';
import { LancamentosPage } from './../pages/lancamentos/lancamentos';
import { HomePage } from '../pages/home/home';
import { ContasPage } from './../pages/contas/contas';
import { ModalContasPage } from './../pages/modal-contas/modal-contas';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContasProvider } from '../providers/contas/contas';
import { DatabaseProvider } from '../providers/database/database';
import { LancamentosProvider } from '../providers/lancamentos/lancamentos';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContasPage,
    ContactPage,
    HomePage,
    ModalContasPage,
    LancamentosPage,
    ModalLancamentosPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContasPage,
    ContactPage,
    HomePage,
    ModalContasPage,
    LancamentosPage,
    ModalLancamentosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: 'pt-BR '},
    ContasProvider,
    SQLite,
    DatabaseProvider,
    LancamentosProvider
  ]
})
export class AppModule {}
