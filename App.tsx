import './global.css';
import { Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { AppProvider } from './src/context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <PaperProvider theme={DefaultTheme}>
        <AppNavigator />
        <Toast />
      </PaperProvider>
    </AppProvider>
  );
}
