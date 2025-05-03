import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  content: {
    padding: 20,
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  subject: {
    fontSize: 15,
    color: '#444',
  },
  grade: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#007bff',
  },
});
