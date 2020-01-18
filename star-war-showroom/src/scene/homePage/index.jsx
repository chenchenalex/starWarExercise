import React, { Component } from "react";
import { connect } from "react-redux";
import TableList from "./components/TableList";
import { NUM_PER_PAGE } from "../../constants";
import { getPeopleData, getFilms } from "../../actions";
import ItemDetail from "./components/ItemDetail/ItemDetail";

class SWTable extends Component {
  state = {
    pageIndex: 0,
    selectedPerson: null,
  };
  onSelect = id => {
    this.setState({ selectedPerson: id });

    this.props.getFilmList(this.props.people[id].films);
  };
  componentDidMount() {
    this.props.getPeopleList(this.state.pageIndex);
  }
  render() {
    return (
      <div>
        <TableList data={this.props.people} onSelect={this.onSelect} />
        {this.state.selectedPerson && (
          <ItemDetail
            id={this.state.selectedPerson}
            personData={this.props.people[this.state.selectedPerson]}
            filmData={this.props.films}
          />
        )}
      </div>
    );
  }
}

function mapStates(states) {
  return { people: states.people || {}, films: states.films || {} };
}

function mapDispatch(dispatch) {
  return {
    getPeopleList: pageList => {
      dispatch(getPeopleData(pageList));
    },
    getFilmList: urls => {
      // take in an array of film urls
      dispatch(getFilms(urls));
    },
  };
}

export default connect(mapStates, mapDispatch)(SWTable);
