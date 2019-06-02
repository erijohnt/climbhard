import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import { VictoryPie } from "victory";

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

const locations = [];

fetch('./data/climb_metadata.json')
  .then(response => response.json())
  .then(data => {
    data.forEach((d,i) => {locations[i] = d})
  });

function CircSize(n) {
  return 10 + 2 * n
}

class ClimbingMap extends Component {

  constructor() {
    super()
    this.state = {
      center: [0,20],
      zoom: 1,
    }
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleReset() {
    this.setState({
      center: [0,20],
      zoom: 1,
    })
  }
  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom += 1,
    })
  }
  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom = this.state.zoom === 1? 1 : this.state.zoom - 1,
    })
  }

  render() {
    return (
      <div>
        <div style={wrapperStyles}>
          <button 
          onClick={this.handleZoomIn}>
            { "Zoom In" }
          </button>
          <button onClick={this.handleZoomOut}>
            { "Zoom Out" }
          </button>
          <button onClick={this.handleReset}>
            { "Reset" }
          </button>
        </div>
        <div style={wrapperStyles}>
          <ComposableMap
            projectionConfig={{ 
              scale: 410*.8,
              rotation: [-11,0,0],
            }}
            width={1960*.8}
            height={1102*.8}
            style={{
              width: "100%",
              height: "auto",
            }}
            >
            <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
              <Geographies geography="/data/world-50m.json">
                {(geographies, projection) =>
                  geographies.map((geography, i) =>
                    geography.id !== "ATA" && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          hover: {
                            fill: "#CFD8DC",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          pressed: {
                            fill: "#FF5722",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                        }}
                      />
                    )
                  )
                }
              </Geographies>
              <Markers>
                {locations.map((marker, i) => (
                  <Marker
                    key={i}
                    marker={marker}
                    >
                    <VictoryPie
                      standalone={ false }
                      width={ CircSize(marker.boulders + marker.routes) }
                      height={ CircSize(marker.boulders + marker.routes) }
                      padding={ 0 }
                      colorScale={["tomato", "navy" ]}
                      style={{
                        text: null,
                        labels: { fill: "black" },
                      }}
                      data={[
                        { x: "Boulders", y: marker.boulders},
                        { x: "Sport Routes", y: marker.routes},
                      ]}
                      events={[{
                          target: "data",
                          eventHandlers: {
                            onClick: () => {
                              return [
                                {
                                  target: "labels",
                                  mutation: (props) => {
                return props.text === null ? { text: `Area: ${marker.area}\nHard Boulders: ${marker.boulders}\nHard Sport Routes: ${marker.routes}` } : {text : null};
                              }
                            }
                          ];
                        }
                      }
                    }]}
                    data={[{ x: "Boulders", y: marker.boulders},
                        { x: "Sport Routes", y: marker.routes},]}
                    />
                    <text
                      textAnchor="middle"
                      y={25}
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fill: "black",
                        size: 24
                      }}
                      >
                      {this.state.zoom > 5 ? marker.area : ''}
                    </text>
                  </Marker>
                ))}
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    )
  }
}

export default ClimbingMap