import React from 'react';

import sampleProducts from '../seed';
import Product from './Product';
import Toggle from './Toggle';
import NameForm from './NameForm';
import UncontrolledForm from './UncontrolledForm';

class ProductList extends React.Component {
    // Class components should always call the base constructor with props.
    constructor (props) {
        super(props);
        this.handleProductUpvote = this.handleProductUpvote.bind(this);
        this.state = {
            products: []
        };
    }

    componentDidMount () {
        this.setState({ products: sampleProducts });
    }

    handleProductUpvote (productId) {
        const products = [...this.state.products];
        products.map((product) => {
            if (product.id === productId) {
                product.votes += 1;
            }
            return product;
        });
        this.setState({ products });
    }

    render () {
        // not using state
        // const productComponents = sampleProducts.map((product) => (
        // using state
        // I am building an array of Product elements to be rendered together below
        const productComponents = this.state.products.map((product) => (
          <Product key={`product-${product.id}`}
            id={product.id}
            title={product.title}
            votes={product.votes}
            onVote={this.handleProductUpvote}
            description={product.description} />
        ));
        return (
            <div className="ui unstackable items">
              <h2>Product List from map in const</h2>
              <Toggle />
              <NameForm />
              <UncontrolledForm />
              {productComponents}
            </div>
        );
    }
}

export default ProductList;
