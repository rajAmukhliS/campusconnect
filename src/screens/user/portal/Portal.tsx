import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppHeader from '../../../components/atoms/headers';
import styles from './styles';

const studentInfo = {
  name: 'John Doe',
  studentId: 'UOG2025001',
  program: 'BS Computer Science',
  semester: '6th Semester',
  faculty: 'Dr. Adeel Ahmad',
};

const subjects = [
  { name: 'Mobile App Development', grade: 'A' },
  { name: 'Data Structures', grade: 'B+' },
  { name: 'Operating Systems', grade: 'A-' },
  { name: 'Database Systems', grade: 'B' },
];

const Portal = () => {
  return (
    <View style={styles.container}>
      <AppHeader title="Student Portal" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student Info</Text>
          <Text>Name: {studentInfo.name}</Text>
          <Text>ID: {studentInfo.studentId}</Text>
          <Text>Program: {studentInfo.program}</Text>
          <Text>Semester: {studentInfo.semester}</Text>
          <Text>Advisor: {studentInfo.faculty}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grades</Text>
          {subjects.map((subj, index) => (
            <View key={index} style={styles.gradeRow}>
              <Text style={styles.subject}>{subj.name}</Text>
              <Text style={styles.grade}>{subj.grade}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Portal;
