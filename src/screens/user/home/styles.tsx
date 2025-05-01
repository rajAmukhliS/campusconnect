import { StyleSheet } from "react-native";
import { mvs } from "../../../config/metrices";
import { colors } from '../../../config/colors';

const  styles = StyleSheet.create({
    // container:{
    //     flex:1,
    //     backgroundColor:colors.white
    // },
    // contentContainerStyle:{
    //     flex:1,
    //     padding:mvs(20)
    // }
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
      },
      contentContainerStyle: {
        padding: 20,
      },
      card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
      },
      cardText: {
        fontSize: 18,
        marginLeft: 15,
        color: '#333',
      },
});
export default styles;