// JS Library
import React, {useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'


const IndexPage = (props) => {
    const {pokedexList, setPokedexList} = props;

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokedex/?limit=28")
        .then((res) => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.results);
            setPokedexList(res.data.results);
        })
        .catch((err) => {console.log(err)});
    }, []);

    return(
        <>
            <header className='container row'>
                <h1 className='col-12'>Pokemon</h1>
            </header>
            <div>
                <h3>Pokedexes:</h3>
                <table className='container table table-striped'>
                    <thead>
                        <tr>
                            <th>ID Number</th>
                            <th>Pokedex Name</th>
                            <th>API Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokedexList.length > 0 && pokedexList.map((pokedex, index) => {
                            return (<tr key={index}>
                                {console.log(pokedex)}
                                <td>{index+1}</td>
                                <td>
                                    <Link to={`/pokedex/${index+1}`}>{pokedex.name}</Link>
                                </td>
                                <td>{pokedex.url}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};


export default IndexPage;