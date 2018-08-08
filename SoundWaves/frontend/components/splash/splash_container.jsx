import { connect } from 'react-redux';
import React from 'react';
import { beginSession } from '../actions/session_actions';
import { createUser } from '../actions/user_actions';
import SplashShow from './splash_show';

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => ({
  beginSession: (userParams) => dispatch(beginSession(userParams)),
  createUser: (user) => dispatch(createUser(user))
});

export default (mapStateToProps, mapDispatchToProps)(SplashShow);
