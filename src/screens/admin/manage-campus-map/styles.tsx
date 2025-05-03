import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  inputContainer: {marginBottom: 16},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 5,
  },
  addButtonText: {color: '#fff', fontWeight: 'bold'},
  scrollContent: {paddingBottom: 50},
  itemCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 10,
  },
  itemName: {fontWeight: 'bold', fontSize: 16},
  deleteButton: {
    marginTop: 8,
    backgroundColor: '#ff3b30',
    padding: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  deleteButtonText: {color: 'white'},
});
