import SQLite from 'react-native-sqlite-storage';


SQLite.enablePromise(true);

const dbName = 'CampusConnect.db';

export const getDBConnection = async () => {
  const db = await SQLite.openDatabase({name: dbName, location: 'default'});
  if (!db) {
    throw new Error('Failed to open the database');
  }
  return db;
};

export const createTables = async () => {
  const db = await getDBConnection();

  // await db.executeSql(`
  //   DROP TABLE IF EXISTS student_info;

  // `);

  // await db.executeSql(`
  //   DROP TABLE IF EXISTS grades;

  // `);
  
  // await db.executeSql(`
  //   DROP TABLE IF EXISTS Notifications;

  // `);

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

  await db.executeSql(`
   CREATE TABLE IF NOT EXISTS student_info (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER,
  name TEXT,
  program TEXT,
  semester TEXT,
  faculty TEXT
);
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS grades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject TEXT,
  grade TEXT,
  student_id INTEGER,
  FOREIGN KEY (student_id) REFERENCES student_info(id)
);
  `);
  

  await db.executeSql(`CREATE TABLE IF NOT EXISTS campus_map (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT
);`);

await db.executeSql(`CREATE TABLE IF NOT EXISTS Notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  time TEXT NOT NULL
);`);


  await db.close();
};

export const insertUser = async (
  name: any,
  email: any,
  password: any,
  role: any,
) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?);`,
    [name, email, password, role],
  );
  await db.close();
};

export const getUserByEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const db = await getDBConnection();
  const [result] = await db.executeSql(
    `SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1;`,
    [email, password],
  );
  await db.close();
  return result.rows.length ? result.rows.item(0) : null;
};

// Add new event
export const addEvent = async (
  title: string,
  date: string,
  description: string,
) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO events (title, date, description) VALUES (?, ?, ?);`,
    [title, date, description],
  );
  await db.close();
};

// Get all events
export const getAllEvents = async () => {
  const db = await getDBConnection();
  const [results] = await db.executeSql(
    `SELECT * FROM events ORDER BY id DESC;`,
  );
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

export const insertClub = async (name: string, description: string) => {
  const db = await getDBConnection();
  await db.executeSql(`INSERT INTO clubs (name, description) VALUES (?, ?);`, [
    name,
    description,
  ]);
  await db.close();
};

// Get all clubs
export const getAllClubs = async () => {
  const db = await getDBConnection();
  const [results] = await db.executeSql(`SELECT * FROM clubs;`);
  const clubs = [];
  for (let i = 0; i < results.rows.length; i++) {
    clubs.push(results.rows.item(i));
  }
  await db.close();
  return clubs;
};

// Delete club by ID
export const deleteClubById = async (id: number) => {
  const db = await getDBConnection();
  await db.executeSql(`DELETE FROM clubs WHERE id = ?;`, [id]);
  await db.close();
};

// Get all emergency contacts
export const getAllEmergencyContacts = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql('SELECT * FROM emergency_contacts');
  const contacts = [];

  if (results.length > 0) {
    const rows = results[0].rows;
    for (let i = 0; i < rows.length; i++) {
      contacts.push(rows.item(i));
    }
  }
  await db.close();
  return contacts;
};

// Insert a new emergency contact
export const insertEmergencyContact = async (
  name: string,
  phone: string,
  department: string,
) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO emergency_contacts (name, phone, department) VALUES (?, ?, ?)`,
    [name, phone, department],
  );
  await db.close();
};

// Delete an emergency contact by id
export const deleteEmergencyContactById = async (id: number) => {
  const db = await getDBConnection();
  await db.executeSql(`DELETE FROM emergency_contacts WHERE id = ?`, [id]);
  await db.close();
};

// Get all forums
export const getAllForums = async () => {
  const db = await getDBConnection();
  const [results] = await db.executeSql(`SELECT * FROM forums;`);
  const forums = [];

  for (let i = 0; i < results.rows.length; i++) {
    forums.push(results.rows.item(i));
  }

  await db.close();
  return forums;
};

// Delete forum by ID
export const deleteForumById = async (id: number) => {
  const db = await getDBConnection();
  await db.executeSql(`DELETE FROM forums WHERE id = ?;`, [id]);
  await db.close();
};

export const insertForum = async (
  title: string,
  content: string,
  author: string,
  date: string,
) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO forums (title, content, author, date) VALUES (?, ?, ?, ?);`,
    [title, content, author, date],
  );
  await db.close();
};

export const getStudentInfo = async () => {
  const db = await getDBConnection();
  try {
    const [results] = await db.executeSql('SELECT * FROM student_info');
    const rows = await results.rows;
    const data: any[] = [];

    for (let i = 0; i < rows.length; i++) {
      data.push(rows.item(i));
    }

    return data;
  } catch (error) {
    console.error('Error fetching student info:', error);
    throw error;
  } finally {
    await db.close();
  }
};

// export const getStudentGrades = async () => {
//   const db = await getDBConnection();
//   const results = await db.executeSql('SELECT * FROM grades;');
//   const grades = [];
//   const rows = results[0].rows;
//   for (let i = 0; i < rows.length; i++) {
//     grades.push(rows.item(i));
//   }
//   await db.close();
//   return grades;
// };

// export const getStudentGrades = async (studentId) => {
//   const db = await getDBConnection();
//   const result = await db.executeSql(
//     `SELECT * FROM grades WHERE student_id = ?`,
//     [studentId]
//   );
//   await db.close();
//   return result.rows._array; // Return all grades for the given student
// };

export const getStudentGrades = async studentId => {
  const db = await getDBConnection();
  try {
    const [result] = await db.executeSql(
      'SELECT * FROM grades WHERE student_id = ?',
      [studentId],
    );

    // Check if rows are available
    if (result.rows.length > 0) {
      const grades = [];
      for (let i = 0; i < result.rows.length; i++) {
        grades.push(result.rows.item(i)); // Add each grade to the array
      }
      return grades;
    } else {
      return []; // Return an empty array if no grades found
    }
  } catch (error) {
    console.error('Error fetching grades:', error);
    return []; // Return an empty array in case of error
  } finally {
    await db.close();
  }
};

export const getAllStudentGrades = async () => {
  const db = await getDBConnection();
  try {
    const [result] = await db.executeSql('SELECT * FROM grades');
    const grades = [];
    for (let i = 0; i < result.rows.length; i++) {
      grades.push(result.rows.item(i));
    }
    return grades;
  } catch (error) {
    console.error('Error fetching all grades:', error);
    return [];
  } finally {
    await db.close();
  }
};

// Delete grades by ID
export const deleteGradeById = async (id: number) => {
  const db = await getDBConnection();
  await db.executeSql('DELETE FROM grades WHERE id = ?;', [id]);
  await db.close();
};

export const deleteStudentInfoById = async (id: number) => {
  const db = await getDBConnection();
  await db.executeSql('DELETE FROM student_info WHERE id = ?;', [id]);
  await db.close();
};


// Fetch all campus map items
export const getCampusMapItems = async () => {
  const db = await getDBConnection();
  try {
    const result = await db.executeSql('SELECT * FROM campus_map');
    await db.close();
    return result[0].rows.raw(); // ✅ safer than _array
  } catch (err) {
    console.error('Error fetching campus map items:', err);
    await db.close();
    return [];
  }
};

// Add new campus map item
export const addCampusMapItem = async (name, description) => {
  const db = await getDBConnection();
  try {
    await db.executeSql(
      'INSERT INTO campus_map (name, description) VALUES (?, ?)',
      [name, description]
    );
    await db.close();
  } catch (err) {
    console.error('Error adding campus map item:', err);
    await db.close();
  }
};

// Update campus map item
export const updateCampusMapItem = async (id, name, description) => {
  const db = await getDBConnection();
  try {
    await db.executeSql(
      'UPDATE campus_map SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    await db.close();
  } catch (err) {
    console.error('Error updating campus map item:', err);
    await db.close();
  }
};

// Delete campus map item
export const deleteCampusMapItemById = async (id) => {
  const db = await getDBConnection();
  try {
    await db.executeSql('DELETE FROM campus_map WHERE id = ?', [id]);
    await db.close();
  } catch (err) {
    console.error('Error deleting campus map item:', err);
    await db.close();
  }
};


export const getAllNotifications = async () => {
  const db = await getDBConnection();
  try {
    const results = await db.executeSql('SELECT * FROM Notifications ORDER BY time DESC');
    await db.close();
    return results[0].rows.raw(); // safer than _array
  } catch (err) {
    console.error('Error fetching notifications:', err);
    await db.close();
    return [];
  }
};

// Add a new notification
export const addNotification = async (title: string, message: string) => {
  const db = await getDBConnection();
  const time = new Date().toLocaleString();
  try {
    await db.executeSql(
      'INSERT INTO Notifications ( title, message, time) VALUES ( ?, ?, ?)',
      [ title, message, time]
    );
    await db.close();
  } catch (err) {
    console.error('Error adding notification:', err);
    await db.close();
  }
};

// Delete a notification by ID
export const deleteNotification = async (id: string) => {
  const db = await getDBConnection();
  try {
    await db.executeSql('DELETE FROM Notifications WHERE id = ?', [id]);
    await db.close();
  } catch (err) {
    console.error('Error deleting notification:', err);
    await db.close();
  }
};
