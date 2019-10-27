import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from './Header/Header';
import Home from './Home/Home';
import Footer from "./Footer/Footer";
import Detail from "./Home/Detail/Detail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path='/detail/:id' component={Detail} />
        <Route render={() => <h1>Not found!</h1>} />
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
