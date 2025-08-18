"use client";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download } from "lucide-react";



const pdfs = [
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
    const handleBack = () => {
        window.history.back();
    };

    const handleDownload = (url, name) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                    <TableBody>
                        {pdfs.map((pdf) => (
                            <TableRow key={pdf.id} className="cursor-pointer hover:bg-muted">
                                <TableCell
                                    onClick={() => window.open(pdf.url, "_blank")}
                                    className="font-medium"
                                >
                                    {pdf.name}
                                </TableCell>
                                <TableCell>{pdf.createdAt}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDownload(pdf.url, pdf.name + ".pdf")}
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