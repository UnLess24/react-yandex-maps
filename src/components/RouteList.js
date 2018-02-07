import React, { Component } from 'react';

class RouteList extends Component {
  constructor (props) {
    super (props);

    this.allowDrop = this.allowDrop.bind(this);
    this.addRoutePoint = this.addRoutePoint.bind(this);
    this.drag= this.drag.bind(this);
    this.drop= this.drop.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.removeRoutePoint = this.removeRoutePoint.bind(this);
  }

  allowDrop (event) {
    event.preventDefault();
  }

  addRoutePoint (event) {
    if (event.keyCode === 13) {
      this.props.addPoint(event.target.value);
      event.target.value = '';
    }
  }

  drag (event) {
  }

  drop (event) {
    let text = event.target.textContent;
    text = text.substring(0, text.length -1);
    this.props.invertPoints(event.dataTransfer.getData("Text"), text);
  }

  dragStart (event) {
    let text = event.target.textContent;
    text = text.substring(0, text.length -1);
    event.dataTransfer.setData("Text", text);
  }

  removeRoutePoint (event) {
    let point = event.target.parentElement.textContent;
    point = point.substring(0, point.length - 1);
    this.props.removePoint(point);
  }

  render() {
    const routes = this.props.routes.map(route =>
      <li key={route}
        onDragStart={this.dragStart}
        onDrag={this.drag}
        draggable="true"
      >{route}
        <span
          className="float-right"
          onClick={this.removeRoutePoint}
          style={{ cursor: 'pointer', marginRight: 15 }}
        >x</span>
      </li>);

    return (
      <div>
        <input type="text"
          className="form-control form-control-sm"
          placeholder="Ввести точку маршрута"
          onKeyUp={this.addRoutePoint}
        />

        <ul style={{ paddingTop: 10 }}
          onDrop={this.drop}
          onDragOver={this.allowDrop}
        >
          {routes}
        </ul>
      </div>
    );
  }
}

export default RouteList;
