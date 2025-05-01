import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);
const db = SQLite.openDatabase({ name: 'CampusConnect.db', location: 'default' });

export const createUsersTable = async () => {
  const database = await db;
  await database.executeSql(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    );`
  );
};

export const insertUser = async (name: string, email: string, password: string, role: string) => {
  const database = await db;
  await database.executeSql(
    `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?);`,
    [name, email, password, role]
  );
};

export const getUserByEmailAndPassword = async (email: string, password: string) => {
  const database = await db;
  const [result] = await database.executeSql(
    `SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1;`,
    [email, password]
  );
  return result.rows.length ? result.rows.item(0) : null;
};
