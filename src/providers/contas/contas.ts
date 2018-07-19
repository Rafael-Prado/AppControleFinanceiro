import { Injectable } from '@angular/core';

import { DatabaseProvider } from './../database/database';
import { SQLiteObject } from '../../../node_modules/@ionic-native/sqlite';

@Injectable()
export class ContasProvider {
list: any = [];

  constructor(private dbProvider: DatabaseProvider)
  {
    this.dbProvider.criarDataBase();
  }

  getList(){
    return this.dbProvider.getDb()
    .then((db: SQLiteObject) =>{
      let sql = 'SELECT *FROM contas';
      return db.executeSql(sql, [])
      .then((data: any ) =>{
        if(data.rows.length > 0){
          let contas: any[] = [];
          for(var i = 0; i < data.rows.length; i++ ){
            var conta = data.rows.item(i);
            contas.push(conta);
          }
          return contas;
        }else{
          return[];
        }
      })
      .catch((e) => console.error(e));      
    })
    .catch((e) => console.error(e));  
  }

  insert(conta: Conta){
    return this.dbProvider.getDb()
    .then((db: SQLiteObject) =>{
      let sqlQuery = "INSERT INTO  contas (descricao) VALUES (?)";
      let data = [conta.descricao];
      return db.executeSql(sqlQuery, data)
      .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));

  }

  edit(conta){

  }

  delete(id: number){
    return this.dbProvider.getDb()
    .then((db: SQLiteObject) =>{
      let sqlQuery = "DELETE FROM contas WHERE id = ?";
      let data = [id];
      return db.executeSql(sqlQuery, data)
      .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

}

export class Conta{
  id: number;
  descricao: string;
}
