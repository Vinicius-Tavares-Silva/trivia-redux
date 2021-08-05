import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Ranking from './pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/"><Login /></Route>
        <Route exact path="/Settings"><Settings /></Route>
        <Route path="/game"><Game /></Route>
        <Route path="/ranking"><Ranking /></Route>
      </Switch>
    );
  }
}

export default App;
