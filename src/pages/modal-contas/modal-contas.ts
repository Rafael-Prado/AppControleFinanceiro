import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-contas',
  templateUrl: 'modal-contas.html',
})
export class ModalContasPage {

  view: any;
  conta:any;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  )
  {
    this.view = viewCtrl;
    this.conta = this.navParams.get("parametro") || { descricao : "" };
  }
  ionViewDidLoad() {
  }

  cancel(){
    this.view.dismiss();
  }

  salvar(){
    this.view.dismiss(this.conta);
  }

}
