"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = () => {
    const userCredentials = {
      email: email,
      password: password
    };

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userCredentials),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Login successful!");
          router.push("/home");
        } else {
          alert("Login failed: " + (data.message || "Please try again."));
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      }); 
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Giriş Yap</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                E-posta
              </label>
              <Input
                id="email"
                type="email"
                placeholder="E-posta adresinizi girin"
                required
                className="mt-1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Şifre
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Şifrenizi girin"
                required
                className="mt-1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
              <Button type="button" className="w-full" onClick={handleLogin}>
                Giriş Yap
              </Button>
            <div className="text-center">
              <span className="text-sm">Hesabınız yok mu? </span>
              <Link href="/register" className="text-blue-600 hover:underline">
                Kayıt Ol
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}