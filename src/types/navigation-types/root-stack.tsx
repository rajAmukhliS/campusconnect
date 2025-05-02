import { Task } from "../entities-types";

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  AddTask:Task|undefined,
  Events:undefined;
  Portal:undefined;
  CampusMap:undefined;
  Forums:undefined;
  Notifications:undefined;
  Clubs: undefined;
  Emergency: undefined;
  AdminDashboard: undefined;
  ManageEvents: undefined;
  AddEvent:undefined;
  AddClub:undefined;
  ManageClubs: undefined;
  ManageForums: undefined;
  AddForum:undefined;
  ManageEmergencyContacts: undefined;
  AddEmergencyContact: undefined;
};
export default RootStackParamList;
