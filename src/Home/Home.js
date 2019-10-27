import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

function Home() {
  let arr = [];
  const congress = FillCongress();

  const [state, setState] = useState(
    {
      members: [],
      filter: [],
      search: {
        name: '',
        gender: '',
        party: '',
        title: '',
        master: '',
      },
      chamber:'senate',
      congress: {
        senate:congress.senate,
        house: congress.house
      },
      fields: false
    });

  function getData(chamber = 'senate', congress = '115') {
    let myConf = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'GUF2CQ0rG04ijvUvaAROQATvITB2xDuNsnH58nmh'
      }
    };

    fetch('https://api.propublica.org/congress/v1/' + congress + '/' + chamber + '/members.json', myConf)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then(data => {
        setState({...state,
          members: data.results[0].members,
          filter: data.results[0].members,
        });
      })
      .catch(onerror => {
        console.log(onerror.stack);
      })
  }

  useEffect(() => {
    if (state.members.length === 0){
      return getData();
    }
  });

  function FillCongress() {
    let senate = [] ;
    let house = [];
    for (let i = 80; i <= 116; i++){
      if (i !== 115) {
        senate.push(<option value={i} key={i}>{i}</option>);
        if (i > 101) {
          house.push(<option value={i} key={i}>{i}</option>);
        }
      } else {
        senate.push(<option defaultValue={i} key={i}>{i}</option>);
        house.push(<option defaultValue={i} key={i}>{i}</option>);
      }
    }
    return {senate, house}
  }

  function GetChamber(e) {
    const chamber = e.target.value;
    setState({...state,
      chamber: chamber
    });
    console.log(chamber);
  }

  function GetCongress(e) {
    const congress = e.target.value;
    const chamber = document.getElementById('chamberFilter').value;

    getData(chamber, congress);
  }

  function FilterMembers(filter, data, members){
    if (filter === 'first_name') {
      return members.filter((member) => {
        return member[filter].toLowerCase().search(data) > -1 || member[filter].toLowerCase().search(data) > -1
      });
    } else {
      return members.filter((member) => {
        return member[filter].search(data) > -1
      })
    }
  }

  function FilterMaster(e) {
    const search = e.target.value.toLowerCase();
    arr = state.members.filter((member) => {
      if (member.first_name.toLowerCase().search(search) > -1 || member.last_name.toLowerCase().search(search) > -1){
        return true
      }else if(member.gender.toLowerCase().search(search) > -1){
        return true
      } else if (member.party.toLowerCase().search(search) > -1) {
        return true
      } else return member.title.toLowerCase().search(search) > -1;
    });

    setState({ ...state ,
      filter: arr,
      search: {
        name: state.search.name,
        gender: state.search.gender,
        title: state.search.title,
        party: state.search.party,
        master: search
      }
    });
  }

  function FilterByName(e) {
    const name = e.target.value.toLowerCase();
    arr = FilterMembers('first_name', name, state.members);

    if (state.search.gender !== '')
      arr = FilterMembers('gender', state.search.gender, arr);

    if (state.search.party !== '')
      arr = FilterMembers('party', state.search.party, arr);

    if (state.search.title !== '')
      arr = FilterMembers('title', state.search.title, arr);

    setState({ ...state ,
      filter: arr,
      search: {
        name: name,
        gender: state.search.gender,
        title: state.search.title,
        party: state.search.party,
        master: state.search.master
      }
    });
  }

  function FilterByGender(e) {
    const gender = e.target.value;
    arr = FilterMembers('gender', gender, state.members);

    if (state.search.name !== '')
      arr = FilterMembers('first_name', state.search.name, arr);

    if (state.search.party !== '')
      arr = FilterMembers('party', state.search.party, arr);

    if (state.search.title !== '')
      arr = FilterMembers('title', state.search.title, arr);

    setState({...state,
      filter: arr,
      search:{
        name: state.search.name,
        gender: gender,
        title: state.search.title,
        party: state.search.party,
        master: state.search.master
      }
    });
  }

  function FilterByParty(e) {
    const party = e.target.value;
    arr = FilterMembers('party', party, state.members);

    if (state.search.name !== '')
      arr = FilterMembers('first_name', state.search.name, arr);

    if (state.search.gender !== '')
      arr = FilterMembers('gender', state.search.gender, arr);

    if (state.search.title !== '')
      arr = FilterMembers('title', state.search.title, arr);

    setState({ ...state ,
      filter: arr,
      search: {
        name: state.search.name,
        gender: state.search.gender,
        title: state.search.title,
        party: party,
        master: state.search.master
      }
    });
  }

  function FilterByTitle(e) {
    const title = e.target.value;
    arr = FilterMembers('title', title, state.members);

    if (state.search.name !== '')
      arr = FilterMembers('first_name', state.search.name, arr);

    if (state.search.gender !== '')
      arr = FilterMembers('gender', state.search.gender, arr);

    if (state.search.title !== '')
      arr = FilterMembers('title', state.search.title, arr);

    setState({ ...state ,
      filter: arr,
      search: {
        name: state.search.name,
        gender: state.search.gender,
        title: title,
        party: state.search.party,
        master: state.search.master
      }
    });
  }

  function ToggleFields(e) {
    setState({...state,
      fields: !state.fields
    });
  }

  function ResetFilter() {
    setState({...state,
      filter: state.members,
      search: {
        name: '',
        gender: '',
        title: '',
        party: ''
      }
    })
  }

  return(
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-10">
          <div className="form-group">
            <label htmlFor="chamberFilter">Chamber</label>
            <select className="form-control" id="chamberFilter" onChange={GetChamber}>
              <option value='senate'>Senate</option>
              <option value="house">House</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4 col-10">
          <div className="form-group">
            <label htmlFor="congressFilter">Congress</label>
            <select className="form-control" id="congressFilter" onChange={GetCongress}>
              {state.chamber === 'senate' ? state.congress.senate : state.congress.house}
            </select>
          </div>
        </div>
      </div>
      {state.fields ? (
        <div className="row justify-content-center">
          <div className="col-lg-4 col-10">
            <div className="form-group">
              <label htmlFor="nameFilter">Name</label>
              <input type="text" className="form-control" onChange={FilterByName} id="nameFilter" aria-describedby="Name Filter" placeholder="Ej. John" value={state.search.name} />
            </div>
            <div className="form-group">
              <label htmlFor="titleFilter">Title</label>
              <input type="text" className="form-control" onChange={FilterByTitle} id="titleFilter" aria-describedby="Title Filter" placeholder="2nd Class" value={state.search.title} />
            </div>
          </div>
          <div className="col-lg-4 col-10">
            <div className="form-group">
              <label htmlFor="genderFilter">Gender</label>
              <select className="form-control" id="genderFilter" onChange={FilterByGender}>
                <option defaultValue hidden> Select a value</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="partyFilter">Party</label>
              <select className="form-control" id="partyFilter" onChange={FilterByParty}>
                <option defaultValue hidden> Select a value</option>
                <option value="R">Republic</option>
                <option value="D">Democratic</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-4 offset-lg-2 col-10">
            <div className="form-group">
              <label htmlFor="congressFilter">Search</label>
              <input type="text" className="form-control" onChange={FilterMaster} id="masterFilter" aria-describedby="Search" value={state.search.master} />
            </div>
          </div>
        </div>
      ) }
      <div className="row justify-content-center mb-3">
        <div className="col-3">
          <button className="btn btn-primary btn-block" onClick={ToggleFields}>{state.fields ? 'HIDE FILTERS' : 'SHOW FILTERS'}</button>
        </div>
        <div className="col-3">
          <button className="btn btn-secondary btn-block" onClick={ResetFilter}>CLEAR</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table">
            <thead className="thead-dark">
              <tr className='text-center'>
                <th scope='col'>#</th>
                <th scope='col'>NAME</th>
                <th scope='col'>TITLE</th>
                <th scope='col'>PARTY</th>
                <th scope='col'>GENDER</th>
                <th scope='col'>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {state.filter.map( (member, i) => {
                return (
                  <tr key={i}>
                    <th className='text-center' scope='row'>{member.id}</th>
                    <td>{member.first_name} {member.last_name}</td>
                    <td>{member.title}</td>
                    <td className='text-center'>{member.party === 'R' ? <span className="badge badge-pill badge-danger text-uppercase">Republic</span> : <span className="badge badge-pill badge-primary text-uppercase">Democracy</span>}</td>
                    <td className='text-center'>{member.gender}</td>
                    <td className='text-center'><Link to={'/detail/' + member.id}><i className="fas fa-eye fa-lg" /></Link></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;