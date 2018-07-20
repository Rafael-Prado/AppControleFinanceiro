import { Injectable } from '@angular/core';
import { DatabaseProvider } from './../database/database';
import { SQLiteObject } from '../../../node_modules/@ionic-native/sqlite';

@Injectable()
export class LancamentosProvider {

  constructor(private dbProvider: DatabaseProvider) {
    
  }

  insert(lancamento: Lancamento){
    return this.dbProvider.getDb()
    .then((db: SQLiteObject) =>{
      let sqlQuery = "INSERT INTO  lancamentos (descricao, valor, data, conta, entradaSaida, pago) VALUES (?,?,?,?,?,?)";
      let data = [lancamento.descricao];
      return db.executeSql(sqlQuery, data)
      .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));

  }

  getList(){
    return this.dbProvider.getDb()
    .then((db: SQLiteObject) =>{
      let sql = 'SELECT *FROM lancamentos';
      return db.executeSql(sql, [])
      .then((data: any ) =>{
        if(data.rows.length > 0){
          let lancamentos: any[] = [];
          for(var i = 0; i < data.rows.length; i++ ){
            var lancamento = data.rows.item(i);
            lancamentos.push(lancamento);
          }
          return lancamentos;
        }else{
          return[];
        }
      })
      .catch((e) => console.error(e));      
    })
    .catch((e) => console.error(e));  
  }

}


export class Lancamento{
  id:number;
  descricao: string;
  valor: number;
  data: string;
  conta: string;
  entradaSaida: string;
  pago: string;
}
