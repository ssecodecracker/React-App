import React from 'react';

const PaginationList = (props) => {
    debugger;
    let pagination = [];
    if (props.showPagination) {
        for (let page = 0; page < props.pages; page++) {
            if ((props.activePage) === page) {
                pagination.push(<li className="active" key={page} onClick={() => props.clicked(page)}>{page + 1}</li>);
            }
            else {
                pagination.push(<li key={page} onClick={() => props.clicked(page)}>{page + 1}</li>);
            }
        }
    }
    return (
        pagination
    )
}

export default PaginationList;