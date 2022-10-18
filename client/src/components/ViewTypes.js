// JS Libraries
import React, {useState} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {useQuery} from 'react-query';

// Components
import NavBar from './NavBar';


const ViewTypes = (props) => {
    const {id} = useParams();
    const {type, setType} = props;
    
    // Caching the data
    const [loading, setLoading] = useState(true);

    // Notifier in the Console
    console.log(`Loading ${id} types`);

    const results = useQuery(`type-${id}`, () => {
        return axios.get(`https://pokeapi.co/api/v2/type/${id}`)
        .then((res) => {
            console.log("Type data:");
            //console.log(res);
            console.log(res.data);
            setType(res.data);
            setLoading(false);
            console.log("------------------");
        })
        .catch((err) => {
            console.log(err);
            setLoading(true);
        });
    });
    console.log("Type Results:");
    console.log(results);

    if (loading) return <><h1>Loading..</h1></>;

    return (
        <>
            <NavBar/>
            <div className='container row'>
                {console.log(type)}
                <h3>{type.name}</h3>
                <div className='container row'>
                    <h5>Damage Relations:</h5>
                    <div className='container col-2'>
                        <table className='container table table-striped'>
                            <thead>
                                <tr>
                                    <th>Double Damage From</th>
                                </tr>
                            </thead>
                            <tbody>
                                {type.damage_relations.double_damage_from.length >= 1 ? type.damage_relations.double_damage_from.map((type, index) => {
                                    return (<tr key={index}>
                                        <td>
                                            <Link to={`/type/${type.name}`}>{type.name}</Link>
                                        </td>
                                    </tr>)
                                }) : <tr><td>None</td></tr>}
                            </tbody>
                        </table>
                    </div>
                    <div className='container col-2'>
                        <table className='container table table-striped'>
                            <thead>
                                <tr>
                                    <th>Double Damage To</th>
                                </tr>
                            </thead>
                            <tbody>
                                {type.damage_relations.double_damage_to.length >= 1 ? type.damage_relations.double_damage_to.map((type, index) => {
                                    return (<tr key={index}>
                                        <td>
                                            <Link to={`/type/${type.name}`}>{type.name}</Link>
                                        </td>
                                    </tr>)
                                }) : <tr><td>None</td></tr>}
                            </tbody>
                        </table>
                    </div>
                    <div className='container col-2'>
                        <table className='container table table-striped'>
                            <thead>
                                <tr>
                                    <th>Half Damage From</th>
                                </tr>
                            </thead>
                            <tbody>
                                {type.damage_relations.half_damage_from.length >= 1 ? type.damage_relations.half_damage_from.map((type, index) => {
                                    return (<tr key={index}>
                                        <td>
                                            <Link to={`/type/${type.name}`}>{type.name}</Link>
                                        </td>
                                    </tr>)
                                }) : <tr><td>None</td></tr>}
                            </tbody>
                        </table>
                    </div>
                    <div className='container col-2'>
                        <table className='container table table-striped'>
                            <thead>
                                <tr>
                                    <th>Half Damage To</th>
                                </tr>
                            </thead>
                            <tbody>
                                {type.damage_relations.half_damage_to.length >= 1 ? type.damage_relations.half_damage_to.map((type, index) => {
                                    return (<tr key={index}>
                                        <td>
                                            <Link to={`/type/${type.name}`}>{type.name}</Link>
                                        </td>
                                    </tr>)
                                }) : <tr><td>None</td></tr>}
                            </tbody>
                        </table>
                    </div>
                    <div className='container col-2'>
                        <table className='container table table-striped'>
                            <thead>
                                <tr>
                                    <th>No Damage From</th>
                                </tr>
                            </thead>
                            <tbody>
                                {type.damage_relations.no_damage_from.length >= 1 ? type.damage_relations.no_damage_from.map((type, index) => {
                                    return (<tr key={index}>
                                        <td>
                                            <Link to={`/type/${type.name}`}>{type.name}</Link>
                                        </td>
                                    </tr>)
                                }) : <tr><td>None</td></tr>}
                            </tbody>
                        </table>
                    </div>
                    <div className='container col-2'>
                        <table className='container table table-striped'>
                            <thead>
                                <tr>
                                    <th>No Damage To</th>
                                </tr>
                            </thead>
                            <tbody>
                                {type.damage_relations.no_damage_to.length >= 1 ? type.damage_relations.no_damage_to.map((type, index) => {
                                    return (<tr key={index}>
                                        <td>
                                            <Link to={`/type/${type.name}`}>{type.name}</Link>
                                        </td>
                                    </tr>)
                                }) : <tr><td>None</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    {/* Need to add in more data for types here */}
                </div>
            </div>
        </>
    );
};


export default ViewTypes;