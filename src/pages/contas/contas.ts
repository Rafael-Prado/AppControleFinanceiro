import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

import { ModalContasPage } from './../modal-contas/modal-contas';
import { ContasProvider, Conta } from './../../providers/contas/contas';

@IonicPage()
@Component({
  selector: 'page-contas',
  templateUrl: 'contas.html',
})
export class ContasPage {

  public listaContas: Conta[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public contasProvider: ContasProvider,
    public modalCtrl: ModalController,
    private toast: ToastController
  ) {

  }

  ionViewDidEnter() {
    this.getAllContas();
  }

  getAllContas() {
    this.contasProvider.getList()
      .then((result: any) => {
        this.listaContas = result;
        console.log(this.listaContas);
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar contas', duration: 3000, position: 'buttom' }).present();
      })
  }

  insert() {
    let modal = this.modalCtrl.create(ModalContasPage);
    modal.present()
  }

  edit(item){

  }

  delete(conta: Conta){
   this.contasProvider.delete(conta.id)
      .then(() => {
        let index = this.listaContas.indexOf(conta);
        this.listaContas.splice(index, 1);
        this.toast.create({ message: 'Conta removida com sucesso!', duration: 3000, position: 'buttom' }).present();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao remover conta!', duration: 3000, position: 'buttom' }).present();
      })
  }



}
