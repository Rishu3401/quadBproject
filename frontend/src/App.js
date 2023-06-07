import './App.css';
import {MainPage } from '../src/components/MainPage';
import { AppProvider } from './AppContext.js';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/components/styles.css';

function App() {
  return (
    <div className="App">
       <AppProvider>
      <MainPage/>
      </AppProvider>

    </div>
  );
}

export default App;
