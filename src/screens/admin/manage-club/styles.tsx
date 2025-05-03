import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },

  // Add Button Styles
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Item Styles
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },

  // Delete Button Styles
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default styles;
