import React, { useState } from 'react'

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()
        if (text === '') {
            setAlert('Please enter something', 'light')
        } else {
            searchUsers(text)
            setText('')
        }

    }

    const onChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" name="text" placeholder="Search User..."
                    value={text}
                    onChange={onChange} />
                <input type="submit"
                    value="Search"
                    className="btn btn-dark btn-block" />
            </form>
            {showClear && (
                <button className="btn btn-light btn-block" onClick={clearUsers}
                >clear</button>
            )}
        </div>
    )
}


export default Search
