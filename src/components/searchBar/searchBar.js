import React from 'react'

const SearchBar = (props) => {
    return (
        <div className="searchBarContainer">
            <div>
                <label>Search By Name</label>
            </div>
            <input type="text" onChange={(event) => props.changed(event)}></input><button>Search</button>
        </div>
    )
}

export default SearchBar