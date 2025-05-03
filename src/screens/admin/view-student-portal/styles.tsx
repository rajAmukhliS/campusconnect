
// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   content: {
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#222',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 4,
//     marginTop: 8,
//   },
//   section: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#333',
//   },
//   input: {
//     backgroundColor: '#FAFAFA',
//     borderColor: '#CCC',
//     borderWidth: 1,
//     borderRadius: 6,
//     padding: 10,
//     marginBottom: 12,
//     fontSize: 16,
//   },
//   gradeRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   subject: {
//     fontSize: 16,
//     color: '#444',
//   },
//   grade: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   addButton: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   addButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//   },
//   saveButton: {
//     backgroundColor: '#28A745',
//     padding: 12,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   saveButtonText: {
//     color: '#FFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default styles;

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  subject: {
    fontSize: 16,
    color: '#000',
  },
  grade: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  deleteButton: {
  backgroundColor: '#e74c3c',
  padding: 12,
  marginTop: 20,
  borderRadius: 8,
  alignItems: 'center',
},
deleteButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},

});

export default styles;

