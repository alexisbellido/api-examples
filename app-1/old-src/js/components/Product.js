import React from 'react';

class Product extends React.Component {
    // Class components should always call the base constructor with props.
    constructor (props) {
        // any time we define our own custom component methods, we have to manually bind this to the component ourselves.
        super(props);
        this.handleUpvote = this.handleUpvote.bind(this);
    }

    handleUpvote () {
        this.props.onVote(this.props.id);
    }

    handleWithEvent (e, id) {
        // e is the event
        console.log(`Handle with event id: ${id}`);
        e.preventDefault();
    }

    render () {
        return (
            <div className="item">
              <div className="description">
                <h2><a href="#">{this.props.id}: {this.props.title}</a></h2>
                <p>
                  {this.props.description} | <a href="#" onClick={this.handleUpvote}>{this.props.votes} votes</a>
                </p>
                <p>
                  <a href="#" onClick={(e) => this.handleWithEvent(e, this.props.id)}>Click preventing event</a>
                </p>
              </div>
            </div>
        );
    }
}

Product.propTypes = {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string,
    votes: React.PropTypes.number,
    description: React.PropTypes.string,
    onVote: React.PropTypes.func
};

export default Product;
