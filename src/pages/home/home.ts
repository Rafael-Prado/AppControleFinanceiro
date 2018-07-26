import { LancamentosPage } from './../lancamentos/lancamentos';
import { ContasPage } from './../contas/contas';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onLancamentos(){
    this.navCtrl.push(LancamentosPage);
    
  }

  onContas(){
    this.navCtrl.push(ContasPage);
  }

}
