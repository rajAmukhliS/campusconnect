import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  // Button for "Add Forum"
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Card for each forum item
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    // flexDirection:'row',justifyContent:'space-between'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  content: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
  },
  author: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#777',
    marginBottom: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#dc3545',
    borderRadius: 6,
    alignItems: 'center',
    padding:10,
  },

});


export default styles;
