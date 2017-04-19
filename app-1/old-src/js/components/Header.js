import React from 'react';

// stateless functional component
const Header = (props) => {
    // using functional component with event
    function handleClick (e) {
        e.preventDefault();
        console.log('clicked');
    }

    return (
      <header className="top">
      <h1>Favorite color: { props.color }</h1>
      <p>
        <a href="#" onClick={handleClick}>Click me</a>
      </p>
      <div className="bg1">Backgound 1</div>
      <div className="bg2">Backgound 1</div>
      </header>
    );
};

Header.propTypes = {
    color: React.PropTypes.string
};

export default Header;
