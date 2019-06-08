import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import Slider from 'react-rangeslider';
import { csv } from 'd3-fetch';

/*
See slider documentation here:
https://whoisandy.github.io/react-rangeslider/
See simple react map examples here:
https://github.com/zcreativelabs/react-simple-maps
*/

const MAXYEAR = 2019;

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}



function CreateFA(maxYear, locations, allAscents) {
  var FA = [];
  locations.forEach(l => {
    const place = l.area;
    const coord = l.coordinates;
    const count = allAscents.filter(a => ((a.Year !== 1900) && (a.Year < (maxYear + 1)) && (a.Area === place))).length;
    if (count !== 0){
      FA.push({"area" : place, "coordinates" : coord, "count" : count})
    }
  });

  return FA;
}


function CircSize(n) {
  return 10 + 2 * Math.pow(n, 5 / 7)
}

class TimeMap extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      center: [0,20],
      zoom: 1,
      maxYear: 2019,
      loading: true,
      locations: null,
      allAscents: null,
      FilteredAscents: null
    }
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleSlide = this.handleSlide.bind(this)
    this.handleSlideStart = this.handleSlideStart.bind(this)
    this.handleSlideComplete = this.handleSlideComplete.bind(this)
  }

  componentWillMount() {
    console.log('here')
    fetch('./data/climb_metadata.json')
      .then(response => response.json())
      .then(data => {
        console.log('hereee');
        this.setState({
          locations: data,
        });})
      .then(()=>{
        csv("./data/climbingdata.csv")
          .then(data => {
            this.setState({
              allAscents: data,
              loading: false
            });
          })
            console.log(this.state)})

  }

  handleSlideStart() {
    console.log('Slide started')
  };

  handleSlide(value) {
    var FA = CreateFA(value, this.state.locations, this.state.allAscents);
    this.setState({
      maxYear: value,
      FilteredAscents: FA
    })
  };

  handleSlideComplete() {
    console.log('Slide completed')
  };

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
    if (this.state.loading === true){
      return "loading"
    }
    else {
    if (this.state.FilteredAscents === null) {
      this.state.FilteredAscents = CreateFA(MAXYEAR, this.state.locations, this.state.allAscents);
    }
    }
    const f = this.state.FilteredAscents;
    const value = this.state.maxYear;
    return (
      <div>
        <div className='slider'>
          <Slider
            min={1994}
            max={MAXYEAR}
            value={value}
            onChangeStart={this.handleSlideStart}
            onChange={this.handleSlide}
            onChangeComplete={this.handleSlideComplete}
          />
        </div>
        <div style={wrapperStyles}>
          <button 
          onClick={this.handleZoomIn}>
            { "Zoom In" }
          </button>
          <button onClick={this.handleZoomOut}>
            { "Zoom Out" }
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
                        }}
                      />
                    )
                  )
                }
              </Geographies>
              <Markers>
                {f.map((marker, i) => (
                  <Marker
                    key={i}
                    marker={marker}
                    >
                    <circle
                    cx={0}
                    cy={0}
                    r={CircSize(marker.count)}
                    style={{
                      stroke: "#FF5722",
                      strokeWidth: 3,
                      opacity: 0.9,
                    }}
                    />
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

export default TimeMap