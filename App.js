import React from 'react';
import Navigation from './Navigation/Navigation';
import {Provider} from "react-redux";
import Store from './Store/ConfigureStore';

export default function App() {
  return(
          <Provider store={Store}>
            <Navigation/>
          </Provider>
      );

}
