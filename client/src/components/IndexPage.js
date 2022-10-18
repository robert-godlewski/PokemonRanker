// JS Library
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useQuery} from 'react-query';


const IndexPage = (props) => {
    const {pokedexList, setPokedexList} = props;
    const {typeList, setTypeList} = props;

    // Non cached version
    /**
    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokedex/?limit=30")
        .then((res) => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.results);
            setPokedexList(res.data.results);
        })
        .catch((err) => {console.log(err)});
    }, []);
    **/

    /**/
    console.log("Loading IndexPage.js")
    // Cached data
    const [loading, setLoading] = useState(true);
    const pokedex_result = useQuery("pokedexList", () => {
        return axios.get("https://pokeapi.co/api/v2/pokedex/?limit=30")
        .then((res) => {
            //console.log(res);
            //console.log(res.data);
            console.log("Pokedex List:")
            console.log(res.data.results);
            setPokedexList(res.data.results);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            //setLoading(true);
        });
    });
    console.log(pokedex_result);

    const type_results = useQuery("typesList", () => {
        return axios.get("https://pokeapi.co/api/v2/type/?limit=18")
        .then((res) => {
            console.log("Types:")
            console.log(res);
            console.log(res.data);
            console.log(res.data.results);
            setTypeList(res.data.results);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            //setLoading(true);
        });
    });
    console.log(type_results);

    if (loading) return <><h1>Loading..</h1></>;
    /**/

    return(
        <>
            <header className='container row'>
                <h1 className='col-12'>Pokemon</h1>
            </header>
            <div className='container row'>
                <div className='col-6'>
                    <h3>Pokedexes:</h3>
                    <table className='container table table-striped'>
                        <thead>
                            <tr>
                                <th>ID Number</th>
                                <th>Pokedex Name</th>
                                {/*<th>API Link</th>*/}
                            </tr>
                        </thead>
                        <tbody>
                            {/*pokedexList.length > 0 && pokedexList.map((pokedex, index) => {*/}
                            {pokedexList.map((pokedex, index) => {
                                return (<tr key={index}>
                                    {console.log(pokedex)}
                                    <td>{index+1}</td>
                                    <td>
                                        <Link to={`/pokedex/${pokedex.name}`}>{pokedex.name}</Link>
                                    </td>
                                    {/*<td>{pokedex.url}</td>*/}
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='col-6'>
                    <h3>Types:</h3>
                    <table className='container table table-striped'>
                        <thead>
                            <tr>
                                <th>ID Number</th>
                                <th>Type</th>
                                {/*<th>API Link</th>*/}
                            </tr>
                        </thead>
                        <tbody>
                            {typeList.map((type, index) => {
                                return (<tr key={index}>
                                    {console.log(type)}
                                    <td>{index+1}</td>
                                    <td>
                                        <Link to={`/type/${type.name}`}>{type.name}</Link>
                                    </td>
                                    {/*<td>{type.url}</td>*/}
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};


export default IndexPage;