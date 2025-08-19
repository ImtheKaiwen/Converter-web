"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation"; 

function testapi() {
    fetch("http://localhost:8080/api/users")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error fetching data:", error));
}

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        alert("Registered!");
    };

    const handleRegister = () => {
        const newUser = {
            firstName: form.firstname,
            lastName: form.lastname,
            username: form.username,
            email: form.email,
            password: form.password,
        }
        fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newUser),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success === false) {
                    setError(data.message || "Registration failed. Please try again.");
                } else {
                    alert("Registration successful!");
                    router.push("/");
                    setForm({
                        firstname: "",
                        lastname: "",
                        username: "",
                        email: "",
                        password: "",
                    });
                }
            })
            .catch((error) => {
                console.error("Error during registration:", error);
                setError("An error occurred while registering. Please try again.");
            }
        );
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Kayıt Ol</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="firstname">Ad</Label>
                            <Input
                                id="firstname"
                                name="firstname"
                                type="text"
                                placeholder="Adınızı girin"
                                value={form.firstname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="lastname">Soyad</Label>
                            <Input
                                id="lastname"
                                name="lastname"
                                type="text"
                                placeholder="Soyadınızı girin"
                                value={form.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="username">Kullanıcı Adı</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Kullanıcı adınızı girin"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="email">E-posta</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="E-posta adresinizi girin"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="password">Şifre</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Şifrenizi girin"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}
                        <Button type="submit" className="w-full" onClick={handleRegister}>
                            Kayıt Ol
                        </Button>
                    </form>
                    <Button className="w-full mt-4" onClick={testapi}>
                        Api test
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}