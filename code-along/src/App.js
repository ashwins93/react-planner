import React, { Component } from 'react';

import moment from './momentRange';
import Day from './components/Day';

// ONLY FOR DEGBUGGING
window.moment = moment;

class App extends Component {
  state = {
    days: {
      '20181117': {
        event1: {
          title: 'Study React',
          time: '8:00',
          description: 'Learn about state and props',
        },
        event2: {
          title: 'Learn Redux',
          time: '9:00',
          description: 'Learn about reducers, action creators and more.',
        },
      },
      '20190116': {
        event1: {
          title: 'Plan a birthday party for Lidiia',
          time: '00:00',
          description: "Keep it a secret. Don't reveal the plan",
        },
      },
    },
    currentMonth: '201811',
  };

  addOrEditEvent = (event, date, key) => {
    if (!key) key = Date.now();

    this.setState(prevState => ({
      days: {
        ...prevState.days,
        [date]: {
          ...prevState.days[date],
          [key]: event,
        },
      },
    }));
  };

  deleteEvent = (date, key) => {
    let copy = { ...this.state.days[date] };
    delete copy[key];

    this.setState(prevState => ({
      days: {
        ...prevState.days,
        [date]: copy,
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
    let dates = Array.from(
      moment(this.state.currentMonth, 'YYYYMM')
        .range('month')
        .by('days'),
    );
    return (
      <div className="App">
        <h1>
          {moment(this.state.currentMonth, 'YYYYMM').format('MMMM, YYYY')}
        </h1>
        <button onClick={this.prevMonth}>&larr;</button>
        <button onClick={this.nextMonth}>&rarr;</button>

        {dates.map(date => {
          return (
            <Day
              key={date.format('YYYYMMDD')}
              date={date}
              events={this.state.days[date.format('YYYYMMDD')]}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
