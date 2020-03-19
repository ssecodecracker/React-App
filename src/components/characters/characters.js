import React from 'react';


const Characters = (props) => props.filteredCharacters.map((c, i) => {
    if(props.filteredCharacters.length) {

    } else {
        
    }
    return (
        <div className="col-lg-3 col-md-6 col-xs-12 padding-left-right-xs text-white bg-dark" key={c.id}>
            <div className="card">
                <div className="img">
                    <img src={c.image} />
                    <div className="detail">
                        <h5>{c.name}</h5>
                        <div className="created">Id:{c.id}, Created : {c.created}</div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="rows">
                        <span className="ques col-md-3">Status</span>
                        <span className="ans col-md-9">{c.status}</span>
                    </div>
                    <div className="rows">
                        <span className="ques col-md-3">Species</span>
                        <span className="ans col-md-9">{c.species}</span>
                    </div>
                    <div className="rows">
                        <span className="ques col-md-3">Gender</span>
                        <span className="ans col-md-9">{c.gender}</span>
                    </div>
                    <div className="rows">
                        <span className="ques col-md-3">Origin</span>
                        <span className="ans col-md-9">{c.origin.name}</span>
                    </div>
                    <div className="rows">
                        <span className="ques col-md-3">Last Location</span>
                        <span className="ans col-md-9">{c.location.name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
})



export default Characters;