import React from 'react';
import ReactDOM from 'react-dom';
import createComponent from 'react-unit';

import Router from './Router';
import RouteList from './RouteList';
import RouteMap from './RouteMap';

describe('Router', () => {
  it('should render 2 components', () => {
    let component = createComponent.shallow(<Router />);

    const list = component.findByComponent(RouteList);
    const map = component.findByComponent(RouteMap);

    expect(list.length).toEqual(1);
    expect(map.length).toEqual(1);

    // Has rendered 2 components
    expect(list.length).not.toEqual(3);
    expect(map.length).not.toEqual(3);
  });

  it('component RouteList has props', () => {
    let component = createComponent.shallow(<Router />);

    const list = component.findByComponent(RouteList);

    expect(list[0].props.routes).toEqual([]);
    list[0].props.routes = ['1', '2'];
    expect(list[0].props.routes).not.toEqual([]);
    expect(list[0].props.routes).toEqual(['1', '2']);
  });

  it('component RouteMap has props.points', () => {
    let component = createComponent.shallow(<Router />);

    const map = component.findByComponent(RouteMap);

    expect(map[0].props.points).toEqual([]);
    map[0].props.points = ['1', '2'];
    expect(map[0].props.points).not.toEqual([]);
    expect(map[0].props.points).toEqual(['1', '2']);
  });
});
