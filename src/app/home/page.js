"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    fetch("http://localhost:8080/api/auth/current", {
      credentials: "include"  
    })
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          alert("You are not logged in. Please log in first.");
          router.push("/");
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleLogOut = () => {
    fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"  
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Logout successful!");
          router.push("/");
        } else {
          alert("Logout failed: " + (data.message || "Please try again."));
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        alert("An error occurred during logout. Please try again.");
      });
  }

  const handleDownload = (file_id, file_name) => {
    fetch(`http://localhost:8080/api/files/download/${file_id}`, {
      method: "GET",
      credentials: "include"  
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file_name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        alert("An error occurred while downloading the file. Please try again.");
      });
  };

  const handleConvert = () => {
    if (!file) {
      alert("Please select a file to convert.");
      console.log("No file selected for conversion.");
      setFile(null);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:8080/api/files/convert", {
      method: "POST",
      body: formData,
      credentials: "include"  
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const file_id = data.fileId;
          const file_name = data.fileName;
          setConvertedFile({ id: file_id, name: file_name });
          console.log("File converted successfully: ", file_id, file_name);

          alert("File converted successfully!");

          

        } else {
          alert("Conversion failed: " + (data.message || "Please try again."));
        }
      })
      .catch((error) => {
        console.error("Error during conversion:", error);
        alert("An error occurred during conversion. Please try again.");
      });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
          || selectedFile.type === "application/msword")) {
      console.log("Word dosyası yüklendi ", selectedFile);
      setFile(selectedFile);
    } else {
      alert("Lütfen sadece Word dosyası yükleyin (.doc veya .docx)");
      setFile(null);
      console.log("Geçersiz dosya türü: ", selectedFile ? selectedFile.type : "No file selected");
      event.target.value = ""; 
    }
  }

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
          <Button variant="destructive" className="bg-red-600 text-white hover:bg-red-700" onClick={handleLogOut}>
            Logout
          </Button>
        </div>
      </nav>
      <div  className="flex justify-center items-center h-[calc(100vh-80px)]">
        <Card id="convertion" className="w-full max-w-md bg-white dark:bg-neutral-900 shadow-lg">
          <CardContent className="flex flex-col gap-6 pt-8">
            <div className="text-center text-xl font-semibold">Dosya Seç</div>
            <Input
              type="file"
              onChange={handleFileChange}
              className="bg-white dark:bg-neutral-800"
            />
          </CardContent>
          <CardFooter className="flex-col gap-4 justify-center  pb-8">
            <Button className="w-full max-w-xs" onClick={handleConvert}>Convert</Button>
            {convertedFile && (
              <Button
                variant="outline"
                className="w-full max-w-xs bg-green-50 border-green-500 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/30"
                onClick={() => handleDownload(convertedFile.id, convertedFile.name)}
              >
                Download PDF
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}