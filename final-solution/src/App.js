import React, { Component } from "react";
import { Helmet } from "react-helmet";

import moment from "./momentRange";

window.moment = moment;

class App extends Component {
  state = {
    events: {
      "20181101": {
        event1: {
          title: "Build a React App",
          time: "08:00",
          description: "Roll out of bed and start building something",
        },
        event2: {
          title: "Walk",
          time: "16:00",
          description: "Take a walk to relax muscles",
        },
      },
      "20181105": {
        event1: {
          title: "Apply for a Job",
          time: "09:00",
          description: "Post job applications to Google, Facebook and Amazon",
        },
      },
    },
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

  render() {
    return (
      <div>
        <Helmet>
          <title>Planner</title>
        </Helmet>
      </div>
    );
  }
}

export default App;
