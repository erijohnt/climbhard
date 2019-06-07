import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';

function createData(data, minGrade) {
  console.log(minGrade);
  var FA = {nodes: [], links: []};
  var grades = (minGrade === '8C') ? ['8C', '8C+', '9A'] :
    (minGrade == '8C+') ? ['8C+', '9A'] :
    (minGrade == '9A') ? ['9A'] :
    (minGrade == '9a+') ? ['9a+', '9b', '9b+', '9c'] :
    (minGrade == '9b') ? ['9b', '9b+', '9c'] :
    (minGrade == '9b+') ? ['9b+', '9c'] :
    ['9c'];
    console.log(grades);
  data['nodes'].forEach(n => {
    const climbs = (grades.reduce((acc, g) => {
      return acc + n[g]
    }, 0));
    n['size'] = 500 + 200 * Math.pow(climbs, 5 / 7);
    ((climbs !== 0) || (grades.indexOf(n['grade']) >= 0)) ? FA['nodes'].push(n) : null;
  });
  data['links'].forEach(l => {
    (grades.indexOf(l['grade']) >= 0) ? FA['links'].push(l) : null;
  })

  return FA;
};

fetch('./data/forceData.json')
  .then(response => response.json())
  .then(data => console.log(createData(data, '8C+')));

class Hairball extends Component {

  constructor() {
    super()
    this.state = {
      data: null,
      loading: true
    }
  }

  componentWillMount() {
    fetch('./data/forceData.json')
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: createData(data, '8C'),
          loading: false,
          myConfig: {
            "automaticRearrangeAfterDropNode": true,
            "collapsible": false,
            "directed": false,
            "focusAnimationDuration": 0.75,
            "focusZoom": 12,
            "height": 800,
            "highlightDegree": 1,
            "highlightOpacity": 0.2,
            "linkHighlightBehavior": false,
            "maxZoom": 8,
            "minZoom": 0.1,
            "nodeHighlightBehavior": true,
            "panAndZoom": false,
            "staticGraph": false,
            "width": 800,
            "d3": {
              "alphaTarget": 0.05,
              "gravity": -600,
              "linkStrength": 2,
              'linkLength': 100
            },
            "node": {
              "color": "#d3d3d3",
              "fontColor": "black",
              "fontSize": 12,
              "fontWeight": "normal",
              "alignment": "center",
              "highlightColor": "SAME",
              "highlightFontSize": 16,
              "highlightFontWeight": "normal",
              "highlightStrokeColor": "black",
              "highlightStrokeWidth": "SAME",
              "labelProperty": "id",
              "mouseCursor": "pointer",
              "opacity": 1,
              "renderLabel": true,
              "size": 200,
              "strokeColor": "black",
              "strokeWidth": 1.5,
              "svg": "",
              "symbolType": "circlef"
            },
            "link": {
              "color": "#d3d3d3",
              "fontColor": "black",
              "fontSize": 8,
              "fontWeight": "normal",
              "highlightColor": 'k',
              "highlightFontSize": 8,
              "highlightFontWeight": "normal",
              "labelProperty": "label",
              "mouseCursor": "pointer",
              "opacity": 1,
              "renderLabel": false,
              "semanticStrokeWidth": true,
              "strokeWidth": 1.5
            }
          }
        });
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>LOADING</h1>;
    }
    return (
      <div>
        <Graph
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={this.state.data}
          config={this.state.myConfig}
          onClickNode={this.onClickNode}
          onRightClickNode={this.onRightClickNode}
          onClickGraph={this.onClickGraph}
          onClickLink={this.onClickLink}
          onRightClickLink={this.onRightClickLink}
          onMouseOverNode={this.onMouseOverNode}
          onMouseOutNode={this.onMouseOutNode}
          onMouseOverLink={this.onMouseOverLink}
          onMouseOutLink={this.onMouseOutLink}
        />
      </div>
    )
  }
}

export default Hairball