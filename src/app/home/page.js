"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function HomePage() {
  const [file, setFile] = useState(null);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <nav className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="text-2xl font-bold">Converter</div>
        <div className="flex gap-4">
          <Link href="/pdflerim" passHref>
            <Button variant="outline" className="bg-transparent border-gray-300 dark:border-gray-700">
              PDFlerim
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="destructive" className="bg-red-600 text-white hover:bg-red-700">
              Logout
            </Button>
          </Link>
        </div>
      </nav>
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <Card className="w-full max-w-md bg-white dark:bg-neutral-900 shadow-lg">
          <CardContent className="flex flex-col gap-6 pt-8">
            <div className="text-center text-xl font-semibold">Dosya Seç</div>
            <Input
              type="file"
              onChange={e => setFile(e.target.files[0])}
              className="bg-white dark:bg-neutral-800"
            />
          </CardContent>
          <CardFooter className="flex justify-center pb-8">
            <Button className="w-full max-w-xs">Convert</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}