import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
export default function LoginPage() {
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
              />
            </div>
            <Link href={"/home"} passHref> 
              <Button type="submit" className="w-full">
                Giriş Yap
              </Button>
            </Link>
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