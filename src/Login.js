import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold text-black mb-6 text-center">Giriş Yap</h1>
                <form className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="E-posta"
                        className="p-3 border border-black rounded bg-white text-black focus:outline-none"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Şifre"
                        className="p-3 border border-black rounded bg-white text-black focus:outline-none"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition"
                        onClick={() => {navigate("/")}}
                    >
                        Giriş Yap
                    </button>
                    <div className="text-center mt-2">
                        <span className="text-black">Hesabın yok mu? </span>
                        <button
                            className="text-blue-500 hover:underline"
                            onClick={() => navigate("/register")}
                        >
                            Kayıt Ol
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;