import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { PrimaryButton } from '../../components/atoms/buttons';
import AppHeader from '../../components/atoms/headers';
import PrimaryInput from '../../components/atoms/inputs';
import { KeyboardAvoidScrollview } from '../../components/atoms/keyboard-avoid-scrollview';
import RootStackParamList from '../../types/navigation-types/root-stack';
import Medium from '../../typography/medium-text';
import styles from './styles';
import { insertUser } from '../../services/sqllite/db-service';
import { Picker } from '@react-native-picker/picker';
import Regular from 'typography/regular-text';
import { colors } from 'config/colors';


type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const Signup = ({ navigation }: Props) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // default role
  });



  const handleSignup = async () => {
    try {
      await insertUser(values.name, values.email, values.password, values.role);
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Login');
    } catch (error: any) {
      if (error?.message?.includes('UNIQUE constraint failed')) {
        Alert.alert('Error', 'Email already exists');
      } else {
        Alert.alert('Error', 'Signup failed');
      }
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader back title="Sign-up" />
      <KeyboardAvoidScrollview contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          label="Full Name"
          value={values.name}
          onChangeText={(text) => setValues({ ...values, name: text })}
        />
        <PrimaryInput
          keyboardType="email-address"
          label="Email"
          value={values.email}
          onChangeText={(text) => setValues({ ...values, email: text })}
        />
        <PrimaryInput
          secureTextEntry
          label="Password"
          placeholder="********"
          value={values.password}
          onChangeText={(text) => setValues({ ...values, password: text })}
        />
        <Regular style={{color:colors.primary,}} label={'Role'}/>
        {/* Role Picker */}
        <Picker
          selectedValue={values.role}
          onValueChange={(itemValue) => setValues({ ...values, role: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>

        <PrimaryButton
          title="Signup"
          containerStyle={styles.button}
          onPress={handleSignup}
          disabled={!values.name || !values.email || !values.password}
        />

        <Medium
          label="Already have an account"
          onPress={() => navigation.goBack()}
          style={styles.accountText}
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};

export default Signup;
