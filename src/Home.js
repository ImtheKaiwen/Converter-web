import React, {useState} from "react";

import {useNavigate} from "react-router-dom";


function Home() {
    const [count,setCount] = useState(0);
    function upCounter(){

        setCount(count + 1);
    }
    const navigate = useNavigate();

    function sayHello(){
        fetch("http://localhost:8080/hello")
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {console.log(err)});
    }
    return (
        <div>
            <p>Welcome to my website!</p>
            <p>counter : {count}</p>
            <button onClick={upCounter}>click</button>
            <button onClick={()=>{navigate("/login")}}>Go to login page</button>
            <button onClick={sayHello}>Say Hello</button>
        </div>
    )
}

export default Home;
