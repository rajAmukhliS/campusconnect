import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import AppHeader from '../../../components/atoms/headers';
import styles from './styles';
import { getStudentInfo, getAllStudentGrades } from 'services/sqllite/db-service';

const Portal = () => {
  const [studentId, setStudentId] = useState('');
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [grades, setGrades] = useState([]);

  const loadData = async () => {
    try {
      if (!studentId.trim()) {
        Alert.alert('Validation', 'Please enter a student ID.');
        return;
      }

      const infoList = await getStudentInfo();
      const student = infoList.find((s: any) => s.student_id === parseInt(studentId));

      if (!student) {
        Alert.alert('Not Found', 'No student found with this ID.');
        setStudentInfo(null);
        setGrades([]);
        return;
      }

      const gradeList = await getAllStudentGrades();
      const filteredGrades = gradeList.filter((g: any) => g.student_id === parseInt(studentId));

      setStudentInfo(student);
      setGrades(filteredGrades);
    } catch (error) {
      Alert.alert('Error', 'Failed to load student data.');
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Student Portal" />
      
      <View style={styles.inputSection}>
        <TextInput
          placeholder="Enter Student ID"
          value={studentId}
          onChangeText={setStudentId}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity onPress={loadData} style={styles.button}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {studentInfo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Student Info</Text>
            <Text>Name: {studentInfo.name}</Text>
            <Text>ID: {studentInfo.student_id}</Text>
            <Text>Program: {studentInfo.program}</Text>
            <Text>Semester: {studentInfo.semester}</Text>
            <Text>Advisor: {studentInfo.faculty}</Text>
          </View>
        )}

        {studentInfo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Grades</Text>
            {grades.length > 0 ? (
              grades.map((subj: any, index) => (
                <View key={index} style={styles.gradeRow}>
                  <Text style={styles.subject}>{subj.subject}</Text>
                  <Text style={styles.grade}>{subj.grade}</Text>
                </View>
              ))
            ) : (
              <Text>No grades found.</Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Portal;
