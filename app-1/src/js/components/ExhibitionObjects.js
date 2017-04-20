import React from 'react';

class ExhibitionObjects extends React.Component {

  render () {
    const heading = this.props.currentExhibitionId ? <p><a href={`https://collection.cooperhewitt.org/exhibitions/${this.props.currentExhibitionId}/`} target="_blank">Visit the exhibition</a></p> : '';
    return (this.props.currentExhibitionId && this.props.collection_objects.length) ? (
      <div>
        { heading }
        <ul className="collection-objects">
        {this.props.collection_objects.map(object =>
          <li key={object.id} value={object.id}>
            <p><a href={`https://collection.cooperhewitt.org/objects/${object.id}`} target="_blank">{object.title}</a></p>
            <a href={`https://collection.cooperhewitt.org/objects/${object.id}`} target="_blank">
              <img src={object.images[0].n.url} alt={object.title} />
            </a>
          </li>
        )}
        </ul>
      </div>
    ) : <p>loading...</p>;
  }
}

export default ExhibitionObjects;
