import React from 'react';
import { useNavigate } from 'react-router-dom';
const pdfList = [
    { name: 'Örnek PDF 1', url: '/pdfs/ornek1.pdf' },
    { name: 'Örnek PDF 2', url: '/pdfs/ornek2.pdf' },
    { name: 'Örnek PDF 3', url: '/pdfs/ornek3.pdf' },
];

function Pdfs(){
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black flex flex-col">
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
                        onClick={() => navigate("/")}
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
            {/* Content */}
            <div className="flex flex-1 items-center justify-center">
                <div className="p-8 max-w-lg w-full bg-white dark:bg-black rounded-2xl shadow-xl mt-8">
                    <h2 className="text-center text-2xl font-bold text-black dark:text-white mb-8 tracking-wide">
                        PDF Listesi
                    </h2>
                    <ul className="list-none p-0 m-0">
                        {pdfList.map((pdf, idx) => (
                            <li
                                key={idx}
                                className="mb-6 bg-gradient-to-r from-white to-gray-200 dark:from-black dark:to-gray-900 rounded-lg p-5 shadow flex items-center justify-between"
                            >
                                <div className="flex items-center">
                                    
                                    <a
                                        href={pdf.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="no-underline text-black dark:text-white font-bold text-lg hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                    >
                                        {pdf.name}
                                    </a>
                                </div>
                                <a
                                    href={pdf.url}
                                    download
                                    className="ml-4 px-3 py-1 rounded bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-semibold flex items-center"
                                    title="İndir"
                                >
                                    İndir
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Pdfs;