import React, { Component } from 'react';
import RouteList from './RouteList';
import RouteMap from './RouteMap';

class Router extends Component {
  constructor (props) {
    super (props);

    this.state = {
      routes: ['Москва, ул. Арбат', 'Москва, ул. Мясницкая'],
    };

    this.addPoint = this.addPoint.bind(this);
    this.getRoutes = this.getRoutes.bind(this);
    this.invertPoints = this.invertPoints.bind(this);
    this.removePoint = this.removePoint.bind(this);
  }

  addPoint (point) {
    let routes = this.state.routes;
    const index = routes.indexOf(point);
    if (index === -1 && point !== '') {
      routes.push(point);
      this.setState({ routes });
    }
  }

  getRoutes () {
    return this.state.routes;
  }

  invertPoints (draggedPoint, dropOnPoint) {
    let routes = this.state.routes;
    const draggedIndex = routes.indexOf(draggedPoint);
    let dropOnIndex = routes.indexOf(dropOnPoint);
    let indexGrade = 0;
    if (draggedIndex < dropOnIndex) {
      indexGrade = 1;
    }
    routes.splice(draggedIndex, 1);
    dropOnIndex = routes.indexOf(dropOnPoint);
    routes.splice(dropOnIndex + indexGrade, 0, draggedPoint);
    this.setState({ routes });
  }


  removePoint (point) {
    let routes = this.state.routes;
    const index = routes.indexOf(point);
    routes.splice(index, 1);
    this.setState({ routes });
  }

  render() {
    return (
      <div className="row">
        <div className="col-4">
          <RouteList
            addPoint={this.addPoint}
            invertPoints={this.invertPoints}
            removePoint={this.removePoint}
            routes={this.getRoutes()}
          />
        </div>
        <div className="col-8">
          <RouteMap
            routes={this.getRoutes()}
          />
        </div>
      </div>
    );
  }
}

export default Router;
