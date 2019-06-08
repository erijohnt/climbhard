import React from 'react';
import { Graph } from 'react-d3-graph'
import {csv} from 'd3-fetch';
import ExampleChart from './example-chart';
import Hairball from './interactiveforce';
import ClimbingMap from './map';
import TimeMap from './timemap';
import Horizontal from './slider';

const longBlock = `
The beginnings of climbing as a sport are hard to pin down. The Lake and Peak District in the U.K., the Dolomites in Italy, Yosemite in the U.S., and the forest of Fontainebleau in France all have major claims to the birth of climbing or the emergence of a new type of climbing in the 19th and 20th centuries. In its’ early days, most climbing done was of a particular style called alpinism, in which the goal was to climb large and intimidating mountains. This style of climbing still exists today, of course, but climbing has diversified into many sub-disciplines such as trad (or traditional) climbing, sport climbing, speed climbing, big wall climbing, bouldering, etc. Today, two of the most popular sub-disciplines of climbing are sport climbing and bouldering.
  When sport climbing, a climber tries to ascend (or send) a sport route. A sport route is a line in the rock along which a bolter has drilled bolts and hangers into the rock. While climbing the sport route, the climber will hang quickdraws (two carabiners attached by a tether) on these bolts and hangers, and place their rope into the quickdraw for protection against a fall. A climber sends the route when they successfully make it to the top of the route without having fallen or rested on the rope. Sport climbing uses the Yosemite Decimal System to assign a grade that corresponds to the difficulty of the climb. A 5 is always the first number of the grade, indicating that the climb is near-vertical to overhanging. After that, there is a decimal, and then another number. The easiest grade for a rock climb is 5.1. After that, 5.2, and so on. Once the scale reaches 5.10, the second numbers are subdivided into letters a, b, c, and d, with a being the easiest and d being the hardest. So, 5.10a is easier than 5.10b, which is easier than 5.10c, which is easier than 5.10d, which is easier than 5.11a, and so on. \n
  While bouldering, a climber tries to send a boulder problem. In the climbing community, a boulder problem is an established line that does not require a rope for protection. While this is typically done on a large boulder, it may climb a small cliff face or a cave roof instead. While sport routes are longer and taller than boulder problems, sport routes can sometimes be on the short side (~30-40 feet) and boulders can be on the tall side (~25-60 feet). Every fall taken is a ground fall, and usually foam pads are placed on the ground to protect the climber from injury (although this is not always successful, especially with tall boulder problems called highballs). A climber sends a boulder problem when they climb the problem from the start holds up and tops out (stands on top of) the boulder. Boulder problems are graded using the V scale. The easiest boulder problems are V0, then V1, then V2, and so on.
  Typically the first ascentionist of a climb will propose a grade. Eventually, other climbers will repeat the climb and give their own opinion until the climb reaches a consensus grade. In this project, we look at a dataset of the hardest climbs ever put up. For sport climbs, we concern ourselves with climbs graded 5.15a and up, and for boulders, we concern ourselves with climbs graded V15 and up. In order to determine a consensus grade for each climb, we used a function that takes the average suggested grade that all ascentionists have put forward. If a climb has a consensus grade halfway between 5.14d and 5.15a or V14 and V15, it is rounded up and included in the dataset. Anything lower than this, and the climb is excluded.
  Climbers were not able to send climbs of these difficulties until climbing started to become a mainstream sport around the late 90’s and early 2000’s. First, technological advancements in gear and safety equipment had to reach a certain level, effective climbing training methods had to be discovered, and the sport’s base of participants had to grow. Nowadays, the highest caliber climbers usually begin climbing from a young age, made possible by the increasing accessibility of the sport. Without this growth, many of these hardest climbs may not have been done yet.
  Below are some interactive data visualizations. The first is a zoomable world map that shows the concentration of hard climbs throughout the world. The dots size is proportional to number of hard sport routes or boulder problems, and each dot is a pie chart that corresponds to the ratio of sport routes (blue) to boulder problems (orange) in that area. The dots are clickable to reveal the name of the area and the number of each type of climb. The second is also a zoomable world map that comes equipped with a slider that changes the year. The dots’ sizes are proportional to number of ascents at the area (note, not number of routes). This visualization allows you to see the growth of hard climbing worldwide. The third visualization is a force-directed graph that visualizes climbers and their ascents. It is zoomable and draggable. Each node is draggable as well, and mousing over a node will highlight the node and everything connected to the node. You may filter out data by clicking the buttons to remove sport climbs or boulder problems, as well as filter by a minimum grade. The color of the nodes of climbs are all gray, and the color of the climber nodes is arbitrary, but the links that emanate from them are the same color. Climber node size is proportional to the number of ascents they have performed. Enjoy!

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
        <h1> World's hardest climbs </h1>
        <div>{longBlock}</div>
        <ClimbingMap />
        <TimeMap />
        <Hairball />
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;