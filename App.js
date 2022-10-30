import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigationContainer from './src/Router/AppNavigationContainer';

const App = () => {
  return (
      <NavigationContainer>
        <AppNavigationContainer />
      </NavigationContainer>
  );
};

export default App;
