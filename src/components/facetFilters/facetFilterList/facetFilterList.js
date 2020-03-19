import React from 'react';

const FacetFilterList = (props) => {
    let filterList = [];
    props.filterList[props.keys].map((value, index) => {
        filterList.push(
            <li key={index}><input type="checkbox" value={value} onChange={(event) => props.onclick(event, value, props.keys)}></input>{value}</li>
        )
    });

    return (
        filterList
    )
}

export default FacetFilterList;