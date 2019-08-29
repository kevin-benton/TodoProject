import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Root, StyleProvider} from 'native-base';

import AppNavigation from 'BentonTodoNativeApp/App/Navigation/AppNavigation';
import getTheme from 'BentonTodoNativeApp/App/Theme/components';
import materialLight from 'BentonTodoNativeApp/App/Theme/variables/materialLight';
import materialDim from 'BentonTodoNativeApp/App/Theme/variables/materialDim';

class RootContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const themes = {
      light: materialLight,
      dim: materialDim,
    };

    return (
      <StyleProvider style={getTheme(themes[this.props.theme.currentTheme])}>
        <Root>
          <AppNavigation />
        </Root>
      </StyleProvider>
    );
  }
}

const mapStateToProps = state => {
  return {...state};
};

export default connect(mapStateToProps)(RootContainer);
