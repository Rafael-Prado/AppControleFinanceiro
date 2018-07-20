import { ContasPage } from './../contas/contas';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController, NavController, ViewController } from 'ionic-angular';

import { Conta, ContasProvider } from './../../providers/contas/contas';

@IonicPage()
@Component({
  selector: 'page-modal-contas',
  templateUrl: 'modal-contas.html',
})
export class ModalContasPage {

  conta:any;
  public contaObject: Conta

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private contasProvider: ContasProvider,
    private view: ViewController
  )
  {
    
    this.contaObject = new Conta();
  }
  
  cancel(){
    this.view.dismiss();
  }

  salvar(){
    this.salvarContas()
    .then(() =>{
      this.toast.create({message: 'Conta salva', duration: 3000, position: 'bottom'}).present();
      this.navCtrl.pop()
      this.navCtrl.push(ContasPage)
    })
    .catch(() =>{
      this.toast.create({message: 'Erro ao salvar conta', duration: 3000, position: 'bottom'}).present();
    });
  }

  private salvarContas(){    
      return this.contasProvider.insert(this.contaObject);
  }

}
