
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    marginTop: 8,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  subject: {
    fontSize: 16,
    color: '#444',
  },
  grade: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#28A745',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
