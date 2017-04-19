import React from 'react';

class Clock extends React.Component {
    // Class components should always call the base constructor with props.
    constructor (props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount () {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount () {
        clearInterval(this.timerID);
    }

    tick () {
        this.setState(
            { date: new Date() }
        );
    }

    render () {
        return (
          <div>
            <h2>Big Clock</h2>
            <p>It is {this.state.date.toLocaleTimeString()}.</p>
          </div>
        );
    }
}

Clock.propTypes = {
    date: React.PropTypes.instanceOf(Date)
    // also works, more generic
    // date: React.PropTypes.Object
};

export default Clock;
