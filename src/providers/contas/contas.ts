import { Injectable } from '@angular/core';

import { DatabaseProvider } from './../database/database';

@Injectable()
export class ContasProvider {
list: any = [];

  constructor(private dbProvider: DatabaseProvider)
  {
    this.dbProvider.criarDataBase();
  }

  getList(){
    this.list =[
      {descricao: "Alimentação"},
      {descricao: "Lazer"},
      {descricao: "Serviço"},
    ]
    return this.list;

  }

  insert(conta, sucessCallBack){
    setTimeout(function(){
      let sqlQuery = "INSERT INTO  CONTAS (descricao) VALUE (?)";
      this.dataBase.executeSql(sqlQuery, [conta.descricao]).then((data) =>{
        conta.id = data.insertId;
        sucessCallBack(conta);
      }, (error) =>{
        console.log("Error na inserção de contas, " + JSON.stringify(error));
      });
    }, 100);


  }

  edit(conta){

  }

  delete(conta){

  }


}
