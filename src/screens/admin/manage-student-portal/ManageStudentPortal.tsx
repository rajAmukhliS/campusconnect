// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
// import styles from './styles';
// import { getStudentInfo, getStudentGrades } from 'services/sqllite/db-service';

// const ManageStudentPortal = () => {
//   const [studentInfo, setStudentInfo] = useState<any>(null);
//   const [grades, setGrades] = useState([]);

//   const loadData = async () => {
//     const info = await getStudentInfo();
//     const gradeList = await getStudentGrades();
//     setStudentInfo(info);
//     setGrades(gradeList);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Manage Student Portal</Text>
//       {studentInfo && (
//         <View style={styles.section}>
//           <Text style={styles.label}>Name: {studentInfo.name}</Text>
//           <Text style={styles.label}>ID: {studentInfo.student_id}</Text>
//           <Text style={styles.label}>Program: {studentInfo.program}</Text>
//           <Text style={styles.label}>Semester: {studentInfo.semester}</Text>
//           <Text style={styles.label}>Advisor: {studentInfo.faculty}</Text>
//         </View>
//       )}

//       <Text style={styles.sectionTitle}>Grades</Text>
//       <FlatList
//         data={grades}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.gradeRow}>
//             <Text style={styles.subject}>{item.subject}</Text>
//             <Text style={styles.grade}>{item.grade}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default ManageStudentPortal;


// ManageStudentPortal.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';

import AppHeader from '../../../components/atoms/headers';
import { getDBConnection } from 'services/sqllite/db-service';

const ManageStudentPortal = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [program, setProgram] = useState('');
  const [semester, setSemester] = useState('');
  const [faculty, setFaculty] = useState('');
  const [subjects, setSubjects] = useState([{ name: '', grade: '' }]);

  const addSubjectField = () => {
    setSubjects([...subjects, { name: '', grade: '' }]);
  };

  const handleSubjectChange = (index, key, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][key] = value;
    setSubjects(newSubjects);
  };

  const saveData = async () => {
    try {
      const db = await getDBConnection();

    //   await db.executeSql('DELETE FROM student_info');
    //   await db.executeSql('DELETE FROM grades');

      await db.executeSql(
        `INSERT INTO student_info (name, student_id, program, semester, faculty) VALUES (?, ?, ?, ?, ?);`,
        [name, parseInt(studentId), program, semester, faculty]
      );

      for (const subj of subjects) {
        if (subj.name && subj.grade) {
          await db.executeSql(
            `INSERT INTO grades (subject,student_id, grade) VALUES (?,?, ?);`,
            [subj.name,parseInt(studentId), subj.grade]
          );
        }
      }

      Alert.alert('Success', 'Student and grade details saved!');
      setName(''); setStudentId(''); setProgram(''); setSemester(''); setFaculty('');
      setSubjects([{ name: '', grade: '' }]);
      await db.close();
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Manage Student Portal" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Student Information</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Student ID</Text>
        <TextInput style={styles.input} value={studentId} onChangeText={setStudentId} />

        <Text style={styles.label}>Program</Text>
        <TextInput style={styles.input} value={program} onChangeText={setProgram} />

        <Text style={styles.label}>Semester</Text>
        <TextInput style={styles.input} value={semester} onChangeText={setSemester} />

        <Text style={styles.label}>Advisor</Text>
        <TextInput style={styles.input} value={faculty} onChangeText={setFaculty} />

        <Text style={styles.header}>Subjects and Grades</Text>
        {subjects.map((subj, index) => (
          <View key={index} style={styles.subjectRow}>
            <TextInput
              placeholder="Subject"
              style={[styles.input, styles.subjectInput]}
              value={subj.name}
              onChangeText={(text) => handleSubjectChange(index, 'name', text)}
            />
            <TextInput
              placeholder="Grade"
              style={[styles.input, styles.gradeInput]}
              value={subj.grade}
              onChangeText={(text) => handleSubjectChange(index, 'grade', text)}
            />
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <Button title="Add Subject" onPress={addSubjectField} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={saveData} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageStudentPortal;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  label: { fontWeight: 'bold', marginTop: 10 },
  header: { fontSize: 18, fontWeight: 'bold', marginVertical: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  subjectInput: { flex: 2 },
  gradeInput: { flex: 1 },
  buttonContainer: { marginTop: 16 },
});
