import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;
import Config from 'react-native-config';
import { useAppDispatch, useAppSelector } from './../../hooks/use-store';
import Regular from '../../typography/regular-text';
import { SERVICES } from '../../utils';
import { STORAGEKEYS } from '../../config/constants';
import { getUserData } from '../../services/firebase/firebase-actions';

const Splash = (props: props) => {
  const {navigation} =props;
  console.log('Config::',Config.BASE_URL);
  
  React.useEffect(() => {

    (async()=>{
      let screen:'Login'|'Home'|'AdminDashboard' = 'Login';
      SERVICES.getItem(STORAGEKEYS.userId).then((userId:any)=>{
        const user = userId != null ? JSON.parse(userId) : null;
        if(user?.role=='admin'){
           screen='AdminDashboard';
          //  dispatch(getUserData(userId));
        }else if (user?.role=='user') {
          screen='Home';
        } 
        setTimeout(() => {
          navigation?.replace(screen);
        }, 2000);
       })
    })()

  }, []);


  return (
    <View style={{...styles.container}}>
      <Regular style={styles.welcomeText} label={'Welcome to Campus Connect'}/>
    </View>
  );
};
export default Splash;
