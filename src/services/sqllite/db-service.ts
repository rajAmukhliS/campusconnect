// import SQLite from 'react-native-sqlite-storage';

// SQLite.enablePromise(true);

// const dbName = 'CampusConnect.db';

// export const getDBConnection = async () => {
//   return SQLite.openDatabase({ name: dbName, location: 'default' });
// };

// export const createTables = async () => {
//   const db = await getDBConnection();

//   await db.executeSql(`
//     CREATE TABLE IF NOT EXISTS events (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       title TEXT,
//       date TEXT,
//       description TEXT
//     );
//   `);

//   await db.executeSql(`
//     CREATE TABLE IF NOT EXISTS emergency_contacts (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       phone TEXT,
//       department TEXT
//     );
//   `);

//   await db.executeSql(`
//     CREATE TABLE IF NOT EXISTS forums (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       title TEXT,
//       content TEXT,
//       author TEXT,
//       date TEXT
//     );
//   `);

//   await db.executeSql(`
//     CREATE TABLE IF NOT EXISTS clubs (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       description TEXT,
//       joined INTEGER DEFAULT 0
//     );
//   `);

//   await db.close();
// };


import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const dbName = 'CampusConnect.db';

export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: dbName, location: 'default' });
};

export const createTables = async () => {
  const db = await getDBConnection();

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      date TEXT,
      description TEXT
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS emergency_contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      department TEXT
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS forums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      author TEXT,
      date TEXT
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS clubs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      joined INTEGER DEFAULT 0
    );
  `);

  await db.close();
};

export const insertUser = async (name :any, email :any, password : any, role: any) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?);`,
    [name, email, password, role]
  );
  await db.close();
};

export const getUserByEmailAndPassword = async (email:string, password:string) => {
  const db = await getDBConnection();
  const [result] = await db.executeSql(
    `SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1;`,
    [email, password]
  );
  await db.close();
  return result.rows.length ? result.rows.item(0) : null;
};

// Add new event
export const addEvent = async (title: string, date: string, description: string) => {
    const db = await getDBConnection();
    await db.executeSql(
      `INSERT INTO events (title, date, description) VALUES (?, ?, ?);`,
      [title, date, description]
    );
    await db.close();
  };
  
  // Get all events
  export const getAllEvents = async () => {
    const db = await getDBConnection();
    const [results] = await db.executeSql(`SELECT * FROM events ORDER BY id DESC;`);
    const events = [];
    for (let i = 0; i < results.rows.length; i++) {
      events.push(results.rows.item(i));
    }
    await db.close();
    return events;
  };
  
  // Delete event by ID
  export const deleteEventById = async (id: number) => {
    const db = await getDBConnection();
    await db.executeSql(`DELETE FROM events WHERE id = ?;`, [id]);
    await db.close();
  };
  
