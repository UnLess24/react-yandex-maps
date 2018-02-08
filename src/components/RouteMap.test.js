import React from 'react';
import ReactDOM from 'react-dom';
import createComponent from 'react-unit';

import RouteMap from './RouteMap';

describe('RouterMap', () => {
  it('component RouteMap has div', () => {
    let component = createComponent.shallow(<RouteMap />);

    const div = component.findByQuery('div');

    // Проверка все ли props (необходимые) настроены
    // и правильные ли они

    expect(div[0].nodeName).toEqual('div');
    expect(div[0].props.id).toEqual('map');
    expect(div[0].props.style).toEqual({ width: 600, height: 400 });
  });
});
