import React, { Component } from "react";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Thumbnail,
  Text,
  Body,
  Left,
  Right,
  View
} from "native-base";

import styles from "./styles";

class NHThumbnail extends Component {
  // eslint-disable-line

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Thumbnail</Title>
          </Body>
          <Right />
        </Header>


      </Container>
    );
  }
}

export default NHThumbnail;
