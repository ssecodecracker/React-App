import React from 'react';
import './indexPage.css';
import Characters from '../characters/characters';
import SortingMenuList from '../sortingMenuList/sortingMenuList';
import SearchBar from '../searchBar/searchBar';
import PaginationList from '../paginationList/paginationList';
import AppliedFilter from '../appliedFilter/appliedFilter';
import FacetFilter from '../facetFilters/facetFilter';

const axios = require('axios');

export class IndexPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            filteredCharacters: [],
            activePage: 0,
            visibleItemCount: 4,
            pages: 0,
            filters: {
                species: ['Human', 'Mytholog', 'Other Species'],
                gender: ['Male', 'Female'],
                origin: ['Unknown', 'Nuptia 4', 'Other Origins']
            },
            appliedFilters: [],
            showPagination: true,
        }
    }

    componentDidMount() {
        this.fetchCharacter(1);
    }

    //Fetch List Of Characters
    fetchCharacter = (pageNo, ) => {
        const that = this;
        let url = ''
        if (pageNo === 1) {
            url = 'https://rickandmortyapi.com/api/character/';
        } else {
            url = 'https://rickandmortyapi.com/api/character/?page=' + pageNo
        }

        axios.get(url)
            .then(function (response) {

                // handle success
                const characters = response.data.results;
                const pages = response.data.info.pages;
                console.log(characters);
                that.setState(
                    {
                        characters: characters,
                        filteredCharacters: characters,
                        pages: pages
                    }
                );
            });
    }

    //Apply faceted filter, 
    applyFilter = (event, filterValue, filterType) => {
        let appliedFilters = [...this.state.appliedFilters];
        let filteredCharacters = [...this.state.characters];
        let showPagination = this.state.showPagination;
        if (event.currentTarget.checked) {
            appliedFilters.push(
                {
                    filterType: filterType,
                    filterValue: filterValue
                }
            );
            //hide pagination on filter as filtering is being done on current page only
            showPagination = false;
        } else {
            appliedFilters = appliedFilters.filter((value) => {
                return value.filterValue.toLowerCase() !== filterValue.toLowerCase();
            });
            showPagination = true;
        }

        // Filter characters and render
        appliedFilters.map(filter => {
            return (
                filteredCharacters = filteredCharacters.filter(character => {
                    if (filter.filterType === 'origin') {
                        if (filter.filterValue === 'Other Origins') {
                            return (character.origin.name.toLowerCase() !== 'Unknown'.toLowerCase() &&
                                character.origin.name.toLowerCase() !== 'Nuptia 4'.toLowerCase())
                        } else {
                            return character.origin.name.toLowerCase() === filter.filterValue.toLowerCase();
                        }
                    } else {
                        let keyValue = character[filter.filterType];
                        if (filter.filterValue === 'Other Species') {
                            return (keyValue.toLowerCase() !== 'Human'.toLowerCase() &&
                                keyValue.toLowerCase() !== 'Mytholog'.toLowerCase())
                        } else {
                            return keyValue.toLowerCase() === filter.filterValue.toLowerCase();
                        }
                    }
                })
            )
        })

        this.setState(
            {
                appliedFilters: appliedFilters,
                filteredCharacters: filteredCharacters,
                showPagination: showPagination
            }
        )
    }

    //Render character list for respective page click
    handlePaginationClick = (pageClicked) => {
        this.setState({
            activePage: pageClicked
        });

        this.fetchCharacter(pageClicked);
    }

    //Search By Name
    searchByNameHandler = (event) => {
        let searchedCharacters = [...this.state.characters];
        let showPagination = false;
        if (event.target.value.length === 0) {
            searchedCharacters = [...this.state.characters];
            showPagination = true;

        } else {
            searchedCharacters = searchedCharacters.filter(character => {
                return character.name.toLowerCase().includes(event.target.value.toLowerCase());
            });
            showPagination = false;
        }

        this.setState(
            {
                filteredCharacters: searchedCharacters,
                showPagination: showPagination
            }
        )
    }

    //Sort By Id
    sortByIdHandler = (event) => {
        debugger;
        let sortedCharacterList = [...this.state.characters];
        if (event.currentTarget.value === 'ascending') {
            sortedCharacterList = sortedCharacterList.sort(function (a, b) {
                return - (b.id - a.id || a.name.localeCompare(b.name));
            });
        } else if (event.currentTarget.value === 'descending') {
            sortedCharacterList = sortedCharacterList.sort(function (a, b) {
                return - (a.id - b.id || a.name.localeCompare(b.name));
            });
        }

        this.setState(
            {
                filteredCharacters: sortedCharacterList,
            }
        )
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12 col-md-12 col-xs-12">
                    <div className="col-md-3">
                        <h4>Filter</h4>
                        <div className="results filterMenu">
                            <FacetFilter filters={this.state.filters} clicked={this.applyFilter}></FacetFilter>
                        </div>
                    </div>
                    <div className="col-md-9 no-padding">
                        <h4>Selected Filter</h4>
                        <div className="appliedFilter col-sm-12 col-md-12 no-padding">
                            <ul className="appliedFilterList">
                                <AppliedFilter appliedFilters={this.state.appliedFilters}></AppliedFilter>
                            </ul>
                        </div>
                        <div className="toolBar col-sm-12 col-md-12 no-padding">
                            <div className="col-sm-6 col-md-6 no-padding">
                                <SearchBar changed={this.searchByNameHandler}></SearchBar>
                            </div>
                            <div className="col-sm-6 col-md-6 no-padding">
                                <SortingMenuList changed={this.sortByIdHandler}></SortingMenuList>
                            </div>
                        </div>
                        <div className="results col-sm-12 col-md-12 no-padding">
                            <div className="col-sm-12 no-padding">
                                <Characters filteredCharacters={this.state.filteredCharacters}></Characters>
                            </div>
                        </div>
                        <div className="paginationContainer col-xs-12 col-sm-12 col-md-12 no-padding">
                            <ul>
                                <PaginationList pages={this.state.pages} activePage={this.state.activePage} showPagination={this.state.showPagination} clicked={this.handlePaginationClick}></PaginationList>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}