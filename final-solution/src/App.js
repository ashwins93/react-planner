import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import moment from './momentRange';
import Calendar from './components/Calendar';

// only for debugging
// window.moment = moment;

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
  }

  body {
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
    font-size: 1.6rem;
    color: #2d3436;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }
`;

const theme = {
  primary: '#0984e3',
  black: '#2d3436',
  white: '#f5f5f5',
};

class App extends Component {
  state = {
    events: {
      '20181101': {
        event1: {
          title: 'Build a React App',
          time: '08:00',
          description: 'Roll out of bed and start building something',
        },
        event2: {
          title: 'Walk',
          time: '16:00',
          description: 'Take a walk to relax muscles',
        },
      },
      '20181105': {
        event1: {
          title: 'Apply for a Job',
          time: '09:00',
          description: 'Post job applications to Google, Facebook and Amazon',
        },
      },
    },
    currentMonth: '201811',
  };

  addOrEditEvent = (eventObj, date, key) => {
    if (!key) key = Date.now();
    this.setState(prevState => ({
      events: {
        ...prevState.events,
        [date]: {
          ...prevState.events[date],
          [key]: eventObj,
        },
      },
    }));
  };

  deleteEvent = (date, key) => {
    const events = { ...this.state.events[date] };

    delete events[key];

    this.setState(prevState => ({
      events: {
        ...prevState.events,
        [date]: events,
      },
    }));
  };

  nextMonth = () => {
    this.setState(prevState => ({
      currentMonth: moment(prevState.currentMonth, 'YYYYMM')
        .add(1, 'months')
        .format('YYYYMM'),
    }));
  };

  prevMonth = () => {
    this.setState(prevState => ({
      currentMonth: moment(prevState.currentMonth, 'YYYYMM')
        .subtract(1, 'months')
        .format('YYYYMM'),
    }));
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Planner</title>
          <link
            href="https://fonts.googleapis.com/css?family=Raleway|Roboto:300"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
            integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
            crossorigin="anonymous"
          />
        </Helmet>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Calendar
            month={this.state.currentMonth}
            days={this.state.events}
            addOrEditEvent={this.addOrEditEvent}
            deleteEvent={this.deleteEvent}
            nextMonth={this.nextMonth}
            prevMonth={this.prevMonth}
          />
        </ThemeProvider>
      </>
    );
  }
}

export default App;
