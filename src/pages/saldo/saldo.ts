import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { LancamentosProvider } from './../../providers/lancamentos/lancamentos';

@IonicPage()
@Component({
  selector: 'page-saldo',
  templateUrl: 'saldo.html',
})
export class SaldoPage {

  saldo: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private lancamentoProvider: LancamentosProvider
  )
  {
    
  }

  ionViewDidLoad() {
    this.lancamentoProvider.getSaldo((saldo) =>{
      this.saldo = saldo;
    });
    this.events.subscribe("saldo: atualizado", (saldo) =>{
      this.saldo = parseFloat(saldo);
    });
  }

  getsaldo(saldo){
    

  }
}
