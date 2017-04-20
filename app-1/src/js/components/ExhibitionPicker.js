import React from 'react';

class ExhibitionPicker extends React.Component {
  componentDidMount () {
    this.props.loadExhibitions();
  }

  render () {
    return (
      <form className="exhibition-selector">
        <select name="exhibitions" value={this.props.currentExhibitionId} onChange={this.props.changeExhibition}>
          <option value="0">Choose an exhibition...</option>
          {this.props.exhibitions.map(exhibition =>
            <option key={exhibition.id} value={exhibition.id}>{exhibition.title}</option>
          )}
        </select>
      </form>
    );

  }

}

export default ExhibitionPicker;
