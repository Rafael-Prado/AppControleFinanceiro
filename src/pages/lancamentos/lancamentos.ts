import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

import { ContasProvider } from '../../providers/contas/contas';
import { LancamentosProvider, Lancamento } from './../../providers/lancamentos/lancamentos';
import { ModalLancamentosPage } from './../modal-lancamentos/modal-lancamentos';

@IonicPage()
@Component({
  selector: 'page-lancamentos',
  templateUrl: 'lancamentos.html',
})
export class LancamentosPage {

  public lista: Lancamento[] = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public contasProvider: ContasProvider,
    public modalCtrl: ModalController,
    private toast: ToastController,
    private lancamentoProvider: LancamentosProvider
  ) 
  {
    this.getAllLancamentos();
  }

  ionViewDidLoad() {
  }

  getAllLancamentos() {
    this.lancamentoProvider.getList()
      .then((result: any[]) => {
        this.lista = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar lancamentos', duration: 3000, position: 'buttom' }).present();
      })
  }

  insert() {
    let modal = this.modalCtrl.create(ModalLancamentosPage);
    modal.present()
  }

  delete(lancamento: Lancamento){
    this.lancamentoProvider.delete(lancamento.id)
       .then(() => {
         let index = this.lista.indexOf(lancamento);
         this.lista.splice(index, 1);
         this.toast.create({ message: 'Lancamento removido com sucesso!', duration: 3000, position: 'buttom' }).present();
       })
       .catch(() => {
         this.toast.create({ message: 'Erro ao remover lancamento!', duration: 3000, position: 'buttom' }).present();
       })
   }

  lancamentoEntrada(lancamento){
    return lancamento.entradaSaida =="entrada";
  }

  edit(id: number){
    let modal = this.modalCtrl.create(ModalLancamentosPage, { id });
    modal.present()
  }

}
