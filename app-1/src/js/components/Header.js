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
        <h2>The Exhibition Picker Page</h2>
        <p><a href="#" onClick={handleClick}>Click me</a></p>
      </header>
    );
};

export default Header;
