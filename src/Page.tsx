import { useState, useEffect } from 'react'
import './Page.css'
import Highlight from './Highlight';

function Page() {
    type User = {
        name: string,
        city: string,
        email: string | null,
        mac: string | null,
        timestamp: string | null,
        creditcard: string | null,
    };

    useEffect(() => {
        (
            async function () {
                try {
                    await fetch('https://my-json-server.typicode.com/dtunsz/mockjson/users')
                        .then(response => response.json())
                        .then(data => {
                            console.log(data, 'fetched')
                            setUsers(data)
                        })
                }
                catch (err) {
                    console.log(err)
                }
            }
        )()
    }, [])

    const [users, setUsers] = useState<User[]>([])

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState<User[]>([])

    const getValues = (search: string) => {
        setSearch(search)
        doAutoCompelete(search)
    }
    const makeRegex = (search: string) => {
        return new RegExp(search, 'gi');
    }

    const setFind = (user: User) => {
        setSearch(user.name)
        setSearchResult([user]);
    }

    const doAutoCompelete = async (search: string) => {
        if (search.length < 3) {
            setSearchResult([])
            return
        }
        const regex = makeRegex(search)
        const founds = doFilter(users, regex)
        setSearchResult(founds);
        return;
    }

    const doFilter = (arr: User[], regex: RegExp) => {
        return arr.filter(item => item.name.match(regex) || item?.city.match(regex))
    }

    const listItems = searchResult.map((person, index) => <li key={index + person.name + person.city} onClick={() => setFind(person)} className='list'>
        <Highlight value={`${person.name} ${person.city}`} searchValue={search} />
    </li>
    );

    return (
        <div className='page'>
            <h1>Lets find users.</h1>
            <div>
                Search by:
                <br />
                <input value={search} id="search" className='input' placeholder='Enter username or city' type="text" onChange={e => getValues(e.target.value)} />
                <div className='p-10'>
                    {search.length > 2 && searchResult.length ? "Search Result..." : ""}
                    {search.length > 2 && !searchResult.length ? "No match found" : ""}
                    <div id='suggestions'>
                        {listItems}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Page