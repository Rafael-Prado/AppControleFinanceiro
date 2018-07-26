import { SaldoPage } from './../pages/saldo/saldo';
import { ContasProvider } from './../providers/contas/contas';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite'
import { MyApp } from './app.component';

import { ModalLancamentosPage } from './../pages/modal-lancamentos/modal-lancamentos';
import { LancamentosPage } from './../pages/lancamentos/lancamentos';
import { HomePage } from '../pages/home/home';
import { ContasPage } from './../pages/contas/contas';
import { ModalContasPage } from './../pages/modal-contas/modal-contas';
import { StatusPipe } from './../pipes/status/status';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { LancamentosProvider } from '../providers/lancamentos/lancamentos';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    MyApp,
    ContasPage,
    SaldoPage,
    HomePage,
    ModalContasPage,
    LancamentosPage,
    ModalLancamentosPage,
    StatusPipe,


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContasPage,
    HomePage,
    SaldoPage,
    ModalContasPage,
    LancamentosPage,
    ModalLancamentosPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    LancamentosProvider,
    ContasProvider,
    DatePipe
  ]
})
export class AppModule {}
