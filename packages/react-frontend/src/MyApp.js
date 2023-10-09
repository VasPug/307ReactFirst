// src/MyApp.js
import Table from "./Table";
import Form from './Form';
import React, {useState, useEffect} from 'react';

// src/MyApp.js


function MyApp() {
    const [characters, setCharacters] = useState([]);

	useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
      }, [] );

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }
    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
    
        return promise;
      }
      function updateList(person) { 
        postUser(person)
          .then((res) => res.json()).then((json) => setCharacters([...characters, json]))
          .catch((error) => {
            console.log(error);
          })
    }

    function removeOneCharacter (index) {
        
        fetch(`http://localhost:8000/users/${characters[index].id}`, {method: "DELETE"}) .then((res) => {
                if (res.status === 204){
                    console.log("Successful removal");
                    const updated = characters.filter((character, i) => i !== index);
                    setCharacters(updated);
                } else {
                    console.log("Failed removing user");
                }
            });
       
	}
    

    return (
        <div className="container">
            <Table characterData={characters} 
                removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList}/>
        </div>
    )
}



export default MyApp;