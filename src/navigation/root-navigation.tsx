// In App.js in a new project
import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {horizontalAnimation} from '../utils';
import Splash from '../screens/splash';
import RootStackParamList from '../types/navigation-types/root-stack';
import Home from '../screens/user/home';
import AddTask from '../screens/user/add-task';
import Login from '../screens/login';
import Signup from '../screens/signup';
import Events from 'screens/user/events/Events';
import Portal from 'screens/user/portal/Portal';
import CampusMap from 'screens/user/campus-map/CampusMap';
import Forums from 'screens/user/forums/Forums';
import Notifications from 'screens/user/notifications/Notifications';
import Clubs from 'screens/user/clubs/Clubs';
import Emergency from 'screens/user/emergency/Emergency';
import AdminDashboard from 'screens/admin/home/AdminDashboard';
import ManageEvents from 'screens/admin/manage-events/ManageEvents';
import AddEvent from 'screens/admin/add-events/AddEvent';
import ManageForums from 'screens/admin/manage-forums/ManageForums';
import ManageClubs from 'screens/admin/manage-club/ManageClubs';
import AddForum from 'screens/admin/add-forum/AddForum';
import AddClub from 'screens/admin/add-club/AddClub';
import ManageEmergencyContacts from 'screens/admin/manage-emergency-contacts/ManageEmergencyContacts';
import AddEmergencyContact from 'screens/admin/add-emergency-contact/AddEmergencyContact';
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={'#ffffff'}
        barStyle={Platform?.OS === 'ios' ? 'default' : 'dark-content'}
      />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={horizontalAnimation}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddTask" component={AddTask} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="Portal" component={Portal} />
        <Stack.Screen name="CampusMap" component={CampusMap} />
        <Stack.Screen name="Forums" component={Forums} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Clubs" component={Clubs} />
        <Stack.Screen name="Emergency" component={Emergency} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="ManageEvents" component={ManageEvents} />
        <Stack.Screen name="AddEvent" component={AddEvent} />
        <Stack.Screen name="ManageForums" component={ManageForums} />
        <Stack.Screen name="ManageClubs" component={ManageClubs} />
        <Stack.Screen name="AddForum" component={AddForum} />
        <Stack.Screen name="AddClub" component={AddClub} />
        <Stack.Screen name="ManageEmergencyContacts" component={ManageEmergencyContacts} />
        <Stack.Screen name="AddEmergencyContact" component={AddEmergencyContact} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1,},
});

