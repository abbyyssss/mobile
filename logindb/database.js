import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('usuarios.db');

// Cria a tabela de usuários se não existir
export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY NOT NULL,
          nome TEXT NOT NULL,
          senha TEXT NOT NULL
        );`,
        [],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
};

// Função para cadastrar usuário
export const cadastrarUsuario = (nome, senha) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO usuarios (nome, senha) VALUES (?, ?);`,
        [nome, senha],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Função para fazer login
export const loginUsuario = (nome, senha) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM usuarios WHERE nome = ? AND senha = ?;`,
        [nome, senha],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(true); // Login bem-sucedido
          } else {
            resolve(false); // Falha no login
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};
