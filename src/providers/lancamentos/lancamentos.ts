
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

  getData(dataCad: string = null){
    return this.dbProvider.getDb()
    .then((db: SQLiteObject) =>{
      let sql = 'SELECT * FROM lancamentos WHERE data like ?';
      var data: any[] = [];

      data.push('%' + dataCad + '%')
      
      return db.executeSql(sql, [data])
      .then((data: any) =>{
        if(data.rows.length > 0){
          let dados : any[] = [];

          for (let i=0; i < data.rows.length; i++) {
            var dado = data.rows.item(i);
            dados.push(dado);            
          }
          return dados;
        }else{
          return[];
        }
      })
    })
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
  
  getLancamentoEntrada(){
    return this.dbProvider.getDb()
    .then((db: SQLiteObject) =>{
      let sql = "SELECT SUM(valor) as saldo FROM lancamentos WHERE pago = 'true' AND entradaSaida = 'entrada'";
      
      return db.executeSql(sql,[])
      .then((data: any ) =>{
        let item = data;  
        let saldoEntrada = item;        
        return saldoEntrada;
      })
      .catch((e) => console.error(e));      
    })
    .catch((e) => console.error(e));  
  }

  getLancamentoSaida(){
    return this.dbProvider.getDb()
    .then((db: SQLiteObject) =>{
      let sql = "SELECT valor FROM lancamentos WHERE pago = 'true' AND entradaSaida = 'saida'";
      
      return db.executeSql(sql,[])
      .then((data: any ) =>{
        let item = data;  
        let saldoSaida = item;        
        return saldoSaida;
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
