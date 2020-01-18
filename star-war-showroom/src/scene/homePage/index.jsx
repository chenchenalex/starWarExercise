import React, { Component } from "react";
import { connect } from "react-redux";
import TableList from "./components/TableList";
import HomePageStyles from "./homePageStyles.css";
import { getPeopleData, getFilms } from "../../actions";
import ItemDetail from "./components/ItemDetail/ItemDetail";

class SWTable extends Component {
  state = {
    pageIndex: 0,
    selectedPerson: null,
    displayedList: [],
  };
  componentDidMount() {
    this.props.getPeopleList(this.state.pageIndex);
  }

  onSelect = id => {
    this.setState({ selectedPerson: id });

    this.props.getFilmList(this.props.people[id].films);
  };

  onPaginationChange = e => {
    const dataVal = parseInt(e.target.dataset.val);

    this.setState(
      {
        pageIndex: this.state.pageIndex + dataVal,
      },
      () => {
        this.props.getPeopleList(this.state.pageIndex);
      },
    );
  };
  render() {
    return (
      <div styles={HomePageStyles}>
        <TableList
          data={this.props.people}
          index={this.state.pageIndex}
          onSelect={this.onSelect}
        />
        <p className="pagination-block">
          Pagination: {this.state.pageIndex + 1}
          <button
            onClick={this.onPaginationChange}
            data-val="-1"
            aria-label="last page"
            disabled={this.state.pageIndex === 0}
          >
            prev
          </button>
          <button
            onClick={this.onPaginationChange}
            data-val="1"
            aria-label="next page"
          >
            next
          </button>
        </p>
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
