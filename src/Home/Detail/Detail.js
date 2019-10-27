import React, { useState, useEffect } from 'react';

function Detail(props) {
  const [state, setState] = useState(
    {
      detail: {
      },
      roles: [{
        committees: [],
        subcommittees: []
      }]
    });

  function getDatail(uri) {
    let myConf = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'GUF2CQ0rG04ijvUvaAROQATvITB2xDuNsnH58nmh'
      }
    };

    fetch(uri, myConf)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then(data => {
        setState({
          detail: data.results[0],
          roles: data.results[0].roles
        });
        return state;
      })
      .catch(onerror => {
        console.log(onerror.stack);
      })
  }

  useEffect(() => {
    if (Object.entries(state.detail).length === 0 ) {
      let uri = 'https://api.propublica.org/congress/v1/members/' + props.match.params.id;
      return getDatail(uri);
    }
  });

  function goBack(e) {
    e.stopPropagation();
    props.history.goBack();
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <div className="row justify-content-between">
            <div className="col-auto">
              <span className='h1'>{state.detail.first_name + ' ' + state.detail.last_name}</span>
            </div>
            <div className="col-auto">
              <a className='h1' href={state.detail.facebook_account !== null ? 'https://facebook.com/' + state.detail.facebook_account : '#'} target='_blank' rel='noopener noreferrer'><i className="fab fa-facebook" /></a>
              <a className='h1 ml-3' href={state.detail.twitter_account !== null ? 'https://twitter.com/' + state.detail.twitter_account : '#'} target='_blank' rel='noopener noreferrer'><i className="fab fa-twitter" /></a>
              <a className='h1 ml-3' href={state.detail.youtube_account !== null ? 'https://youtube.com/' + state.detail.youtube_account : '#'} target='_blank' rel='noopener noreferrer'><i className="fab fa-youtube" /></a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <label htmlFor="birth" className="font-weight-bolder">Birthday: </label> {state.detail.date_of_birth}
                </li>
                <li className="list-group-item">
                  <label htmlFor="gender" className="font-weight-bolder">Gender: </label> {state.detail.gender === 'M' ? <i className="fas fa-male fa-lg"/> : <i className="fas fa-female fa-lg" /> }
                </li>
                <li className="list-group-item">
                  <label htmlFor="party" className="font-weight-bolder">Party: </label> {state.detail.current_party === 'R' ? <span className="badge badge-pill badge-danger text-uppercase">Republic</span> : <span className="badge badge-pill badge-primary text-uppercase">Democracy</span>}
                </li>
                <li className="list-group-item">
                  <label htmlFor="last-vote" className="font-weight-bolder">Last Vote: </label> {state.detail.most_recent_vote}
                </li>
              </ul>
            </div>
            <div className="col-lg-6 col-12">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <label htmlFor="last-vote" className="font-weight-bolder">In Office: </label> {state.detail.in_office ? <span className="badge badge-pill badge-success">Yes</span> : <span className="badge badge-pill badge-danger">No</span>}
                </li>
                <li className="list-group-item">
                  <label htmlFor="menber-id" className="font-weight-bolder">Member Id: </label> {state.detail.member_id}
                </li>
                <li className="list-group-item">
                  <label htmlFor="votesmart-id" className="font-weight-bolder">Votesmart Id: </label> {state.detail.votesmart_id}
                </li>
                <li className="list-group-item">
                  <label htmlFor="url" className="font-weight-bolder">URL: </label> <a target='_blank' rel='noopener noreferrer' href={state.detail.url}>{state.detail.url}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12">
          <h3>CONGRESS</h3>
          <div className="row">
            {state.roles.map((congress, i) => {
              return (
                <div className='col-lg-6 col-12 mb-3' key={i}>
                  <div className="card">
                    <div className="card-header text-uppercase bg-dark text-white">
                      CONGRES {congress.congress}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{congress.chamber}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{congress.title}</h6>
                      <p className='card-text'>
                        <label className='font-weight-bolder' htmlFor="StartDate">Lapse Date: </label>{congress.start_date + ' | ' + congress.end_date}
                      </p>
                      <p className='card-text'>
                        <label className='font-weight-bolder' htmlFor="StartDate">Party: </label>{congress.party === 'R' ? 'Republic' : 'Democracy'}
                      </p>
                      <p className='card-text'>
                        <label className='font-weight-bolder' htmlFor="office">Office: </label>{congress.office !== null ? congress.office : 'No Data Registered'}
                      </p>
                      <p className='card-text'>
                        <label className='font-weight-bolder' htmlFor="phone">Phone: </label>{congress.phone !== null ? congress.phone : 'No Data Registered'}
                      </p>
                    </div>
                    { }
                    <div className="card-body">
                      <h6 className='card-title font-weight-bold text-center'>COMMITEES</h6>
                    </div>
                    <ul className="list-group list-group-flush">
                    {congress.committees.map((comittee,i) => {
                        return (
                          <li className="list-group-item" key={i}>{comittee.name}</li>
                        )
                      })}
                    </ul>
                    <div className="card-body">
                      <h6 className='card-title font-weight-bold text-center'>SUBCOMMITTEES</h6>
                    </div>
                    <ul className="list-group list-group-flush">
                      {congress.subcommittees.map((subcomittee,i) => {
                        return (
                          <li className="list-group-item" key={i}>{subcomittee.name}</li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="row justify-content-center">
            <div className="col-5">
              <button className="btn btn-primary btn-block mb-3" onClick={goBack}>BACK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;