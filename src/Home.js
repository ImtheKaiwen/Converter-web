import { useState } from "react";
import React from "react";
import './index.css';
import Button from "./components/Button";
import Input from "./components/Input";
import Title from "./components/Title";
import Text from "./components/Text";
import { useNavigate } from "react-router-dom";

function Home() {

    function sayHello() {
        fetch("http://localhost:8080/hello")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
    }
  const [count, setCount] = useState(0);
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <h1>Welcome to the Home Page</h1>
      <p>Current Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      <Button onClick={() => navigate("/login")}>Go to Login page</Button>
        <Title className="text-3xl">This is a Title</Title>
        <Text className="text-lg">This is some text content.</Text>
        <Button className="mt-4" onClick={() => sayHello()}>Say Hello to Console</Button>
    </div>
  );
}

export default Home;