import { StyleSheet } from "react-native";
import { mvs } from "../../config/metrices";
import { colors } from '../../config/colors';

const  styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white
    },
    contentContainerStyle:{
        padding:mvs(20),
        paddingTop:mvs(100),
    },
    button:{
        marginTop:mvs(100),
    },
    accountText:{
        color:colors.primary,
        alignSelf:'center',
        marginTop:mvs(20)
    },
    picker: {
        height: 50,
        width: '100%',
        borderColor: '#ccc',
        backgroundColor:colors.primary,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
      },
});
export default styles;