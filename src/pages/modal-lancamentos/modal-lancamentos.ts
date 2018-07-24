import { LancamentosPage } from './../lancamentos/lancamentos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

import { Lancamento, LancamentosProvider } from './../../providers/lancamentos/lancamentos';

import { Conta, ContasProvider } from './../../providers/contas/contas';

@IonicPage()
@Component({
  selector: 'page-modal-lancamentos',
  templateUrl: 'modal-lancamentos.html',
})
export class ModalLancamentosPage {
  
  lancamento:any;
  contas: Conta[] =[]
  public lancamentoObject: Lancamento

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contasProvider: ContasProvider,
    private lancamentoProvider: LancamentosProvider,
    private toast: ToastController,
    private view: ViewController
    )
  {
    this.lancamentoObject = new Lancamento();
    this.getAllContas();

    if(this.navParams.data.id){
      this.lancamentoProvider.getLancamentoId(this.navParams.data.id)
      .then((result: any ) => {
        this.lancamentoObject = result;
      })
    }
  }

  ionViewDidLoad() {
  }

  salvar(){
    this.salvarLancamento()
    .then(() =>{
      this.toast.create({message: 'Lancamento salvo', duration: 3000, position: 'bottom'}).present();
      this.navCtrl.pop()
      this.navCtrl.push(LancamentosPage)
    })
    .catch(() =>{
      this.toast.create({message: 'Erro ao salvar lançamento', duration: 3000, position: 'bottom'}).present();
    });
  }

  private salvarLancamento(){  
    if(this.lancamentoObject.id){
      return this.lancamentoProvider.update(this.lancamentoObject);
    }else{
      return this.lancamentoProvider.insert(this.lancamentoObject);
    }
      
  }

  cancel(){
    this.view.dismiss();
  }

  getAllContas() {
    this.contasProvider.getList()
      .then((result: any) => {
        this.contas = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar contas', duration: 3000, position: 'buttom' }).present();
      })
  }

}
