import React, { Component } from 'react';

class RouteMap extends Component {
  constructor (props) {
    super(props);
    this.state = {
      multiRoute: null,
      map: null,
      ymaps: window.ymaps,
    };
    this.createMap();
  }

  createMap () {
    let that = this;
    const routes = this.props.routes;
    function init () {
    // Создаем модель мультимаршрута.
    let multiRouteModel = new window.ymaps.multiRouter.MultiRouteModel(routes
        , {
            // Путевые точки можно перетаскивать.
            // Маршрут при этом будет перестраиваться.
            wayPointDraggable: true,
            boundsAutoApply: true
        }),

        // Создаём выпадающий список для выбора типа маршрута.
        routeTypeSelector = new window.ymaps.control.ListBox({
            data: {
                content: 'Как добраться'
            },
            items: [
                new window.ymaps.control.ListBoxItem({data: {content: "Авто"},state: {selected: true}}),
                new window.ymaps.control.ListBoxItem({data: {content: "Общественным транспортом"}}),
                new window.ymaps.control.ListBoxItem({data: {content: "Пешком"}})
            ],
            options: {
                itemSelectOnClick: false
            }
        }),
        // Получаем прямые ссылки на пункты списка.
        autoRouteItem = routeTypeSelector.get(0),
        masstransitRouteItem = routeTypeSelector.get(1),
        pedestrianRouteItem = routeTypeSelector.get(2);

    // Подписываемся на события нажатия на пункты выпадающего списка.
    autoRouteItem.events.add('click', function (e) { changeRoutingMode('auto', e.get('target')); });
    masstransitRouteItem.events.add('click', function (e) { changeRoutingMode('masstransit', e.get('target')); });
    pedestrianRouteItem.events.add('click', function (e) { changeRoutingMode('pedestrian', e.get('target')); });

    window.ymaps.modules.require([
        'MultiRouteCustomView'
    ], function (MultiRouteCustomView) {
        // Создаем экземпляр текстового отображения модели мультимаршрута.
        // см. файл custom_view.js
        new MultiRouteCustomView(multiRouteModel);
    });

    // Создаем карту с добавленной на нее кнопкой.
    let myMap = new window.ymaps.Map('routeMap', {
            center: [55.750625, 37.626],
            zoom: 7,
            controls: [routeTypeSelector]
        }, {
            buttonMaxWidth: 300
        }),

        // Создаем на основе существующей модели мультимаршрут.
        multiRoute = new window.ymaps.multiRouter.MultiRoute(multiRouteModel, {
            // Путевые точки можно перетаскивать.
            // Маршрут при этом будет перестраиваться.
            wayPointDraggable: true,
            boundsAutoApply: true
        });

      that.state.multiRoute = multiRoute;
      that.state.map = myMap;

    // Добавляем мультимаршрут на карту.
    myMap.geoObjects.add(multiRoute);

    function changeRoutingMode(routingMode, targetItem) {
        multiRouteModel.setParams({ routingMode: routingMode }, true);

        // Отменяем выбор элементов.
        autoRouteItem.deselect();
        masstransitRouteItem.deselect();
        pedestrianRouteItem.deselect();

        // Выбираем элемент и закрываем список.
        targetItem.select();
        routeTypeSelector.collapse();
        }
    }

    window.ymaps.ready(init);
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.multiRoute) {
      let multiRouteModel = new this.state.ymaps.multiRouter.MultiRouteModel(nextProps.routes
          , {
              // Путевые точки можно перетаскивать.
              // Маршрут при этом будет перестраиваться.
              wayPointDraggable: true,
              boundsAutoApply: true
          }),
          // Создаем на основе существующей модели мультимаршрут.
          multiRoute = new this.state.ymaps.multiRouter.MultiRoute(multiRouteModel, {
              // Путевые точки можно перетаскивать.
              // Маршрут при этом будет перестраиваться.
              wayPointDraggable: true,
              boundsAutoApply: true
          });
      this.state.map.geoObjects.remove(this.state.multiRoute);
      this.state.map.geoObjects.add(multiRoute);

      this.setState({ multiRoute });
    } else {
      this.forceUpdate();
    }
  }


  render() {
    return (
      <div id="routeMap" style={{ width: 600, height: 400 }}>
      </div>
    );
  }
}

export default RouteMap;
