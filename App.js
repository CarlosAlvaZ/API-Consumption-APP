import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainView from './components/MainView';

export default function App() {
  return (
    <>
      <StatusBar style='light'/>
      <MainView />
    </>
  );
}

const styles = StyleSheet.create({});
