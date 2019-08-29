import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.onPress()}>
            <Icon name={this.props.icon} />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
