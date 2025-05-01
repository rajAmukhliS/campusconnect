import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, View } from 'react-native';
import { KeyboardAvoidScrollview } from '../../components/atoms/keyboard-avoid-scrollview';
import { PrimaryButton } from '../../components/atoms/buttons';
import AppHeader from '../../components/atoms/headers/index';
import PrimaryInput from '../../components/atoms/inputs';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import Medium from '../../typography/medium-text';
import { getUserByEmailAndPassword } from 'services/sqllite/db-service';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import { onLoginPress } from 'services/firebase/firebase-actions';
import { SERVICES } from "../../utils";
import { setUserInfo } from "../../store/reducers/user-reducer";
import { STORAGEKEYS } from 'config/constants';


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {

  const dispatch=useAppDispatch();
  const state =useAppSelector(s=>s?.user);
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    if (!values.email || !values.password) return;

    try {
      const user = await getUserByEmailAndPassword(values.email, values.password);
      if (user) {
        if (user.role === 'admin') {
          SERVICES.setItem(STORAGEKEYS.userId, JSON.stringify(user));
          // SERVICES.resetStack(user, 'AdminDashboard');
          navigation.replace('AdminDashboard'); // Replace with your actual admin screen
        } else {
          SERVICES.setItem(STORAGEKEYS.userId, JSON.stringify(user));
          navigation.replace('Home');
        }
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong during login');
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Sign-in" />
      <KeyboardAvoidScrollview contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          keyboardType="email-address"
          label="Email"
          onChangeText={(str) => setValues({ ...values, email: str })}
          value={values.email}
        />
        <PrimaryInput
          secureTextEntry
          placeholder="********"
          label="Password"
          onChangeText={(str) => setValues({ ...values, password: str })}
          value={values.password}
        />
        <PrimaryButton
          disabled={!values.email || !values.password}
          title="Login"
          onPress={handleLogin}
          containerStyle={styles.button}
        />
        <Medium
          style={styles.accountText}
          onPress={() => navigation.navigate('Signup')}
          label="Register an account"
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};

export default Login;
