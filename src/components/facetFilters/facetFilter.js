import React from 'react';
import FacetFilterList from './facetFilterList/facetFilterList'

const FacetFilter = (props) => {

    let filterDiv = []
    Object.keys(props.filters).forEach((key, index) => {
        filterDiv.push(
            <div className="col-sm-12 col-xs-12 col-md-12" key={index}>
                <h3 className="filterType">{key}</h3>
                <ul className="facets">
                    <FacetFilterList filterList={props.filters} keys={key} onclick={props.clicked}></FacetFilterList>
                </ul>
            </div>
        )
    });

    return (
        filterDiv
    )
}

export  default FacetFilter;