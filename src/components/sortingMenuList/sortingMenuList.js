import React from 'react';

const SortingMenuList = (props) => {
    return (
        <div className="sortListContainer">
            <select id="sortList" onChange={(event) => props.changed(event)}>
                <option value="" disabled selected>Sort By Id</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
        </div>
    )
}

export default SortingMenuList;