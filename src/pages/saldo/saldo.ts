import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';

import { LancamentosProvider } from './../../providers/lancamentos/lancamentos';

@IonicPage()
@Component({
  selector: 'page-saldo',
  templateUrl: 'saldo.html',
})
export class SaldoPage {

  saldoEntrada: number;
  saldoSaida: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private lancamentoProvider: LancamentosProvider,
    private toast: ToastController
  )
  {
    this.getsaldoEntrada();
    this.getsaldoSaida(); 
  }

  ionViewDidLoad() {  
     
  }

  getsaldoEntrada(){
    this.lancamentoProvider.getLancamentoEntrada()
    .then((result: any) => {
      this.saldoEntrada = result;
      console.log(this.saldoEntrada);
    })
    .catch(() => {
      this.toast.create({ message: 'Erro ao carregar contas', duration: 3000, position: 'buttom' }).present();
    })

  }
  getsaldoSaida(){
    this.lancamentoProvider.getLancamentoSaida()
    .then((result: any) => {
      this.saldoSaida = result;
      console.log(this.saldoSaida);
    })
    .catch(() => {
      this.toast.create({ message: 'Erro ao carregar contas', duration: 3000, position: 'buttom' }).present();
    })

  }
}
