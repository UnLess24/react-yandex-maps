import React from 'react';
import ReactDOM from 'react-dom';
import createComponent from 'react-unit';

import RouteList from './RouteList';

describe('RouterList', () => {
  it('component RouteList has equal properties', () => {
    let component = createComponent.shallow(<RouteList routes={[]} />);

    const input = component.findByQuery('input');
    const ul = component.findByQuery('ul');

    // Проверка компонента Input
    expect(input[0].props.placeholder).toBe('Ввести точку маршрута');
    expect(input[0].nodeName).toBe('input');

    // Проверка компонента UL
    expect(ul[0].nodeName).toBe('ul');
    expect(ul[0].props.children.length).toEqual(0);

    expect(ul[0].props.children.length).not.toEqual(2);
  });

  it('component RouteList has equal ul', () => {
    let component = createComponent.shallow(<RouteList routes={['1', '2']} />);

    const ul = component.findByQuery('ul');

    // Проверка компонента UL
    expect(ul[0].nodeName).toBe('ul');
    expect(ul[0].props.children.length).toEqual(2);

    expect(ul[0].props.children.length).not.toEqual(5);
  });
});
