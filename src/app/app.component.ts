import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { ContasPage } from './../pages/contas/contas';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  home : any = HomePage;
  contas: any = ContasPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
        this.rootPage = this.home;

    });
  }

  openPage(opcao){
    this.rootPage = opcao;
  }
}
