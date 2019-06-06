import React from "react";
import { csv } from "d3-fetch";
import ExampleChart from "./example-chart";
import SimpleMarkers from "./map";
import {
  Container,
  Header,
  Divider,
  Placeholder,
  Segment
} from "semantic-ui-react";

const longBlock = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

const PlaceholderExamplePlaceholder = () => (
  <Placeholder fluid>
    <Placeholder.Header>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
  </Placeholder>
);

class RootComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: true
    };
  }

  componentWillMount() {
    csv("data/sample-data.csv").then(data => {
      this.setState({
        data,
        loading: false
      });
    });
  }

  render() {
    const { loading, data } = this.state;
    if (loading) {
      return <h1>LOADING</h1>;
    }
    return (
      <Container>
        <Segment basic />
        <Header dividing size="huge" className="title">
          Climb Hard, Bro
        </Header>
        <Container text>
          <PlaceholderExamplePlaceholder />
          <Header>Hard Climbs</Header>
          <Segment>
            <SimpleMarkers />
          </Segment>
          <PlaceholderExamplePlaceholder />
        </Container>
      </Container>
    );
  }
}
RootComponent.displayName = "RootComponent";
export default RootComponent;
