import React from 'react';
import { Graph } from 'react-d3-graph'
import {csv} from 'd3-fetch';
import ExampleChart from './example-chart';
import Hairball from './interactiveforce';
import ClimbingMap from './map';
import TimeMap from './timemap';
import Horizontal from './slider';

const longBlock = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

class RootComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: true
    };
  }

  componentWillMount() {
    csv('data/sample-data.csv')
      .then(data => {
        this.setState({
          data,
          loading: false
        });
      });
  }

  render() {
    const {loading, data} = this.state;
    if (loading) {
      return <h1>LOADING</h1>;
    }
    return (
      <div className="relative">
        <h1> Case is a child </h1>
        <div>{longBlock}</div>
        <Hairball />;
        <ClimbingMap />
        <div>{longBlock}</div>
        <TimeMap />
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;