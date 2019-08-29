import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Button,
  Container,
  Content,
  Footer,
  Icon,
  Left,
  List,
  ListItem,
  Text,
} from 'native-base';

import ThemeActions, {LIGHT_THEME} from 'BentonTodoNativeApp/App/Redux/Theme';

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const routes = ['Todos'];

    const {theme} = this.props;
    const icon =
      theme.currentTheme === LIGHT_THEME ? 'md-cloud' : 'md-cloud-outline';

    return (
      <Container>
        <Content>
          <List
            dataArray={routes}
            contentContainerStyle={styles.listContainer}
            renderRow={data => {
              return (
                <ListItem
                  button
                  noBorder
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
        <Footer>
          <Left>
            <Button
              primary
              transparent
              onPress={() => this.props.toggleTheme()}>
              <Icon name={icon} />
            </Button>
          </Left>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {...state};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...ThemeActions,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBar);

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 120,
  },
});
