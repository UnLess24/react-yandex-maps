import React, { Component } from 'react';

class RouteMap extends Component {
  constructor (props) {
    super(props);
    this.state = {
      points: [],
      YMaps: window.ymaps,
    };
    this.map = null;

    // Создание карты
    this.createMap();

    // Привязывание контекста к this
    this.changeMarkerOrder = this.changeMarkerOrder.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
  }

  createMap () {
    const that = this;

    let map;
    this.state.YMaps.ready(init);

    function init () {
      map = new that.state.YMaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
        controls: []
      }, {
        searchControlProvider: 'yandex#search'
      });

      that.map = map;
    }
  }

  changeMarkerOrder (points) {
    let mapPoints = [];
    this.map.geoObjects.each(point => {
      if (point.geometry.getType() === "Point") {
        mapPoints.push(point);
      }
    });

    for (let i = 0; i < mapPoints.length; i++) {
      this.map.geoObjects.remove(mapPoints[i]);
    }

    let newPoints = [];
    for (let i = 0; i < points.length; i++) {
      for (let r = 0; r < mapPoints.length; r++) {
        if (points[i] === mapPoints[r].properties.get('balloonContentBody')) {
          newPoints.push(mapPoints[r]);
        }
      }
    }

    for (let i = 0; i < newPoints.length; i++) {
      this.map.geoObjects.add(newPoints[i]);
    }
  }

  createMarker (marker, coordinates) {
    const that = this;
    if (!coordinates) coordinates = this.map.getCenter();

    let point = new this.state.YMaps.GeoObject({
      geometry: {
        type: "Point",
        coordinates
      },
      properties: {
        balloonContentBody: [
          marker
        ].join(''),
        hintContent: 'Маркер ' + marker
      }
    }, {
      preset: 'islands#blackStretchyIcon',
      draggable: true
    });
    point.events.add('dragend', function (event) {
      that.forceUpdate();
      event.stopPropagation();
    });
    this.map.geoObjects.add(point);

    return point;
  }

  componentWillReceiveProps (nextProps) {
    const newLength = nextProps.points.length;
    const stateLength = this.state.points.length;

    let points = [];
    if (newLength === stateLength) {
      this.changeMarkerOrder(nextProps.points);

      points = [...nextProps.points];
      this.setState({ points });

    } else if (newLength < stateLength) {
      const sPoints = this.state.points;

      let index;
      for (let i = 0; i < sPoints.length; i++) {
        index = nextProps.points.indexOf(sPoints[i]);

        if (index === -1) {
          this.removeMarker(sPoints[i]);
        } else {
          points.push(sPoints[i]);
        }
      }

      this.setState({ points });
    } else if (newLength > stateLength) {

      let newPoints = [];
      nextProps.points.map(point => {
        const index = this.state.points.indexOf(point);

        if (index === -1) {
          this.createMarker(point);
          newPoints.push(point);
        }
        return point;
      });
      points = [...this.state.points, ...newPoints];
      this.setState({ points });
    }
  }

  removeMarker (marker) {
    const that = this;

    this.map.geoObjects.each(obj => {
      if (obj.properties.get('balloonContentBody') === marker) {
        that.map.geoObjects.remove(obj);
      }
    });
  }

  render() {
    if (this.map) {
      let coordinates = [];
      let type = [];
      let objToDel;

      this.map.geoObjects.each(obj => {
        if (obj.geometry.getType() === "Point") {
          coordinates.push(obj.geometry.getCoordinates());
        } else if (obj.geometry.getType() === "LineString") {
          objToDel = obj;
        }
        type.push(obj.events);
      });

      this.map.geoObjects.remove(objToDel);

      if (coordinates.length >= 2) {
        const stroke = new this.state.YMaps.GeoObject({
          geometry: {
            type: "LineString",
            coordinates
          },
          properties: {
            hintContent: "Ломаная линия",
            strokeWidth: 2
          }
        });

        this.map.geoObjects.add(stroke);
      }

    }
    return (
      <div id="map" style={{ width: 600, height: 400 }}>
      </div>
    );
  }
}

export default RouteMap;
