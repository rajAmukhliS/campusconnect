import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  getStudentGrades,
  getStudentInfo,
  deleteStudentInfoById,
  deleteGradeById,
  getAllStudentGrades,
} from 'services/sqllite/db-service';

const ViewStudentPortal = () => {
  const navigation = useNavigation();
  const [studentList, setStudentList] = useState<any[]>([]);
  const isfocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const students = await getStudentInfo();
      const allGrades = await getAllStudentGrades();

      const combined = students.map((student: any) => {
        const grades = allGrades.filter(g => g.student_id === student.student_id);
        return { ...student, grades };
      });

      setStudentList(combined);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch student data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isfocused) {
      fetchData();
    }
  }, [isfocused]);

  const handleDelete = (studentId: number) => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this student and their grades?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteStudentInfoById(studentId);
              await deleteGradeById(studentId);
              Alert.alert('Deleted', 'Student has been deleted.');
              fetchData();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete student.');
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Portal (Admin View)</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ManageStudentPortal' as never)}
      >
        <Text style={styles.addButtonText}>+ Add Student</Text>
      </TouchableOpacity>

      {loading && (
        <Text style={{ marginTop: 20, textAlign: 'center' }}>
          Loading student data...
        </Text>
      )}

      <ScrollView style={styles.scroll}>
        {studentList.length > 0 ? (
          studentList.map((student, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.title}>Student Info</Text>
              <Text>Name: {student.name}</Text>
              <Text>ID: {student.student_id}</Text>
              <Text>Program: {student.program}</Text>
              <Text>Semester: {student.semester}</Text>
              <Text>Advisor: {student.faculty}</Text>

              <Text style={styles.title}>Grades</Text>
              {student.grades.length > 0 ? (
                student.grades.map((grade: any, i: number) => (
                  <View key={i} style={styles.gradeRow}>
                    <Text>{grade.subject}</Text>
                    <Text>{grade.grade}</Text>
                  </View>
                ))
              ) : (
                <Text>No grades found.</Text>
              )}

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(student.student_id)}
              >
                <Text style={styles.deleteButtonText}>Delete Student</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={{ marginTop: 20 }}>No student records found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ViewStudentPortal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  scroll: {
    marginTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  deleteButton: {
    backgroundColor: 'red',
    marginTop: 10,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
