import React from 'react';

const AppliedFilter = (props) => {
    let appliedFilters = [];
    props.appliedFilters.map((value, index) => {
        appliedFilters.push(<li key={index}>{value.filterValue}</li>)
    });
    return (
        appliedFilters
    )
}

export default AppliedFilter;