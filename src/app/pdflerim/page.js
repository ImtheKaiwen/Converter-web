"use client";


import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download } from "lucide-react";



const initialPdfs = [
    {
        id: 1,
        name: "Örnek PDF 1",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        createdAt: "2024-06-01",
    },
    {
        id: 2,
        name: "Örnek PDF 2",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        createdAt: "2024-06-02",
    },
];

export default function PdflerimPage() {
    const [pdfs, setPdfs] = useState(initialPdfs);

    const handleBack = () => {
        window.history.back();
    };

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

    useEffect(() => {
        fetch("http://localhost:8080/api/files",{
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    alert("Failed to fetch PDF files.");
                } else {
                    setPdfs(data.files);
                }
            })
            .catch(error => console.error("Error fetching PDF files:", error));
    }, []);
    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="mb-6">
                <Button variant="outline" onClick={handleBack} className="mr-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Geri Gel
                </Button>
            </div>
            <h1 className="text-2xl font-bold text-center mb-6">PDF'lerim</h1>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>PDF İsmi</TableHead>
                            <TableHead>Oluşturulma Tarihi</TableHead>
                            <TableHead className="text-right">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody id="pdf-table-body">
                        {pdfs.map((pdf) => (
                            <TableRow key={pdf.id} className="cursor-pointer hover:bg-muted">
                                <TableCell
                                    className="font-medium"
                                >
                                    {pdf.fileName}
                                </TableCell>
                                <TableCell>{pdf.createdDate}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDownload(pdf.id, pdf.fileName)}
                                        aria-label="İndir"
                                    >
                                        <Download className="w-5 h-5" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}