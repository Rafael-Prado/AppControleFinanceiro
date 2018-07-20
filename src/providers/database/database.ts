
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {
  }

  getDb(){
    return this.sqlite.create({
      name:'financeirobd.db',
      location: 'default'
    });
  }

  criarDataBase(){
    return this.getDb()
    .then((db: SQLiteObject) =>{

      //criar tabela
      this.criarTabelas(db);
    })
    .catch(e => console.log(e));
  }


  private criarTabelas(db: SQLiteObject){
    //criar as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS contas ( id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT)'],
      ['CREATE TABLE IF NOT EXISTS lancamentos ( id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, valor REAL, data TEXT, conta TEXT, entradaSaida TEXT, pago TEXT)']
    ])
    .then(() => console.log('Tabelas criadas'))
    .catch(e => console.error('Erro a criar as tabelas', e));
  }

}
