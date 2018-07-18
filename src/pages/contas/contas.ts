import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

import { ModalContasPage } from './../modal-contas/modal-contas';
import { ContasProvider } from './../../providers/contas/contas';

@IonicPage()
@Component({
  selector: 'page-contas',
  templateUrl: 'contas.html',
})
export class ContasPage {

  public listaContas: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public contas: ContasProvider,
    public modalCtrl : ModalController,
    private toast: ToastController
  )
  {
    this.listaContas = contas.getList();
  }

  ionViewDidLoad() {
  }

  insert(){
    let modal = this.modalCtrl.create(ModalContasPage)

    modal.onDidDismiss( data => {
      if(data){
        this.contas.insert(data, (data) =>{
          this.listaContas.push(data);
          this.toast.create({ message: 'Conta Inserida', duration: 3000, position:'botton'}).present();
        });
      }
    });
    modal.present()
  }



}
