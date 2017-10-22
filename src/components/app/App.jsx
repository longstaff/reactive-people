import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {
  addPeople,
  removePeople,
  fetchLocationsIfNeeded,
} from './actions';

export class App extends Component {

  constructor(props) {
    super(props);
    this.addPerson = this.addPerson.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
  }

  render() {
    let { people, locations } = this.props;
    people = people || [];

    let renderPeople = people.map((val) => {
      return <li key={val.id}>
        <h3>{val.name}</h3>
        <p>{val.age}</p>

        <button onClick={this.deletePerson.bind(this, val.id)}>delete</button>
      </li>
    });
    let renderLocations = <p>No data</p>;
    if (locations.isFetching) {
      renderLocations = <p>Loading data</p>
    } else if (locations.items.length) {
      renderLocations = locations.items.map((val) => {
        return <li key={val.code}>
          <h4>{val.name}</h4>
          <img src={val.flag} width="20"/>
        </li>
      });
    }

    return (
      <div className="App">
        <ol>
          {renderPeople}
        </ol>

        <div>
          <button
            onClick={this.addPerson}
          >
            Add Person
          </button>
        </div>

        <ul>
          {renderLocations}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchLocationsIfNeeded()
  }

  addPerson() {
    this.props.addPeople("newName", "age", "avatar", "bio", "code");
  }
  deletePerson(id) {
    this.props.removePeople(id);
  }
}

const mapStateToProps = (state) => {
    return {
        people: state.people,
        locations: state.locations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPeople: (call, response) => {
            dispatch(addPeople(call, response))
        },
        removePeople: (call, response) => {
            dispatch(removePeople(call, response))
        },
        fetchLocationsIfNeeded: () => {
            dispatch(fetchLocationsIfNeeded())
        }
    }
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp;
