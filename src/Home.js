import { useState } from "react";
import React from "react";
import './index.css';
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
    <div className="min-h-screen bg-white text-black">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-4 bg-white border-b-2 border-black">
            <div className="text-2xl font-bold text-black">Converter</div>
            <div className="flex items-center space-x-6">
                <button
                    className="bg-black text-white border border-black px-4 py-2 rounded hover:bg-gray-800"
                    onClick={() => navigate("/pdfs")}
                >
                    PDFlerim
                </button>
                <button
                    className="bg-black text-white border border-black px-4 py-2 rounded hover:bg-gray-800"
                    onClick={() => navigate("/convert")}
                >
                    Convert
                </button>
                <button
                    className="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded hover:bg-red-700"
                    title="Logout"
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                    </svg>
                </button>
            </div>
        </nav>
        <div className="flex flex-col items-center justify-center py-16">
            <text className="text-3xl font-semibold mb-6 text-black">Dosya Dönüştürücü</text>
            <div className="bg-white rounded-lg p-8 shadow-lg flex flex-col items-center w-full max-w-md">
                <input
                    type="file"
                    className="mb-6 w-full text-black bg-gray-100 border border-gray-300"
                />
                <button className="bg-black text-white w-full hover:bg-gray-800 py-3 rounded">
                    Convert
                </button>
            </div>
        </div>
    </div>
);
}

export default Home;