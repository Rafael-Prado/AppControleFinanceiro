
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
      
      let data = [lancamento.descricao, lancamento.valor, lancamento.data,
                  lancamento.conta, lancamento.entradaSaida, lancamento.pago];
      
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

  getLancamentoId(id: number){
    return this.dbProvider.getDb()
    .then((db: SQLiteObject) =>{
      let sql = 'SELECT *FROM lancamentos where id = ?';
      let data = [id];
      return db.executeSql(sql, data)
      .then((data: any ) =>{
        let item = data.rows.item(0);   
        let lancamento = new Lancamento();
        lancamento = item;
        return lancamento;
      })
      .catch((e) => console.error(e));      
    })
    .catch((e) => console.error(e));  
  }


  update(lancamento: Lancamento){
    return this.dbProvider.getDb()
    .then((db: SQLiteObject) =>{
      let sql = "Update lancamentos set descricao = ?, valor = ?, data = ?, conta = ?, entradaSaida = ?, pago = ? WHERE id = ?";
      let data = [lancamento.descricao, lancamento.valor, lancamento.data,
        lancamento.conta, lancamento.entradaSaida, lancamento.pago, lancamento.id];
        
      return db.executeSql(sql, data)      
      .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  delete(id: number){
    return this.dbProvider.getDb()
    .then((db: SQLiteObject) =>{
      let sqlQuery = "DELETE FROM lancamentos WHERE id = ?";
      let data = [id];
      return db.executeSql(sqlQuery, data)
      .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  getSaldo(obj){
    return this.dbProvider.getDb()
    .then((db: SQLiteObject) =>{
      let sql ="SELECT TOTAL( valor ) as saldo, entradaSaida FROM lancamentos WHERE pago = 'true' AND entradaSaida = 'entrada' UNION SELECT TOTAL(valor) as saldo, entradaSaida FROM lancamentos WHERE  pago = 'true' AND entradaSaida = 'saida' ";

      return db.executeSql(sql, [])
      .then((data: any) =>{
        if (data.rows.length > 0) {
          let saldo = 0;
          if (data.rows.length > 0) {
            for (let i = 0; i < data.length; i++) {
              let item ={
                saldo: data.rows.item(i).saldo,
                entradaSaida: data.rows.item(i).entradaSaida
              }
              if (item.entradaSaida == 'entrada') {
                saldo += item.saldo;
              }else{
                saldo -= item.saldo;
              }              
            }
          }
          obj(saldo);
        }else{
          return[];
        }        
      })
    })
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
