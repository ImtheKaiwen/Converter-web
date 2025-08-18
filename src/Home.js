import { useState } from "react";
import React from "react";
import './index.css';
import Button from "./components/Button";
import Input from "./components/Input";
import Title from "./components/Title";
import Text from "./components/Text";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <h1>Welcome to the Home Page</h1>
      <p>Current Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  );
}

export default Home;