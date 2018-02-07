import React, { Component } from 'react';
import Router from './components/Router';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12" style={{ paddingTop: 20 }}>
            <h2 className="text-center">Маршрут</h2>
          </div>
        </div>
        <Router />
      </div>
    );
  }
}

export default App;
