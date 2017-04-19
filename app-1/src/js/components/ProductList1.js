import React from 'react';

import sampleProducts from '../seed';
import Product from './Product';

class ProductList extends React.Component {
    render () {
        // map with implicit return of Product components that is rendered inside ProductList below
        const productComponents = sampleProducts.map((product) => (
          <Product key={`product-${product.id}`}
            id={product.id}
            title={product.title}
            description={product.description} />
        ));
        return (
            <div className="ui unstackable items">
              <h2>Product List from map in const</h2>
              {productComponents}
              <hr />
              <h2>Product List mapped on the fly, arrow function with implicit return</h2>
              {
                sampleProducts.map((product) => (
                    <Product key={`product-${product.id}`}
                      id={product.id}
                      title={product.title}
                      description={product.description} />
                  )
                )
              }
              <h2>Product List mapped on the fly</h2>
              {
                sampleProducts.map((product) => {
                    return (
                      <Product key={`product-${product.id}`}
                        id={product.id}
                        title={product.title}
                        description={product.description} />
                    );
                })
              }
            </div>
        );
    }
}

export default ProductList;
