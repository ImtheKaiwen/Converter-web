"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";

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
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

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

    const handlePreviewPdf = async (pdf) => {
        setSelectedPdf(pdf);
        
        try {
            const response = await fetch(`http://localhost:8080/api/files/download/${pdf.id}`, {
                method: "GET",
                credentials: "include"
            });
            
            if (!response.ok) {
                throw new Error("Failed to fetch PDF");
            }
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (error) {
            console.error("Error loading PDF preview:", error);
            alert("PDF önizlemesi yüklenirken hata oluştu.");
        }
    };


    useEffect(() => {
        return () => {
            if (pdfUrl) {
                window.URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [pdfUrl]);

    useEffect(() => {
        fetch("http://localhost:8080/api/files", {
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    alert("Failed to fetch PDF files.");
                } else {
                    setPdfs(data.files);
                    if (data.files && data.files.length > 0) {
                        handlePreviewPdf(data.files[0]);
                    }
                }
            })
            .catch(error => console.error("Error fetching PDF files:", error));
    }, []);

    return (
        <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b shadow-sm">
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={handleBack}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Geri Gel
                    </Button>
                    <h1 className="text-2xl font-bold">PDF'lerim</h1>
                </div>
                {selectedPdf && (
                    <Button
                        onClick={() => handleDownload(selectedPdf.id, selectedPdf.fileName)}
                        className="flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        İndir
                    </Button>
                )}
            </div>

            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 bg-gray-100 dark:bg-gray-900 flex flex-col">
                    {selectedPdf && pdfUrl ? (
                        <>
                            <div className="p-4 bg-white dark:bg-gray-800 border-b">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                                            {selectedPdf.fileName}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Oluşturulma: {selectedPdf.createdDate}
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="flex-1 overflow-auto bg-gray-200 dark:bg-gray-800">
                                <div className="p-4">
                                    <div 
                                        className="bg-white shadow-lg mx-auto transition-all duration-300"
                                        style={{ 
                                            minWidth: '600px',
                                            maxWidth: '100%'
                                        }}
                                    >
                                        <embed
                                            src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
                                            type="application/pdf"
                                            className="w-full"
                                            style={{ 
                                                height: `${Math.max(800, window.innerHeight - 200)}px`,
                                                minHeight: '800px'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <h3 className="text-lg font-medium mb-2">
                                    {selectedPdf ? 'PDF Yükleniyor...' : 'PDF Seçin'}
                                </h3>
                                <p className="text-sm">
                                    {selectedPdf ? 'PDF içeriği yükleniyor...' : 'Görüntülemek için sağ taraftaki listeden bir PDF seçin'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-1/3 bg-white dark:bg-gray-800 border-l overflow-y-auto">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Dosyalar ({pdfs.length})
                        </h2>
                        <div className="space-y-2">
                            {pdfs.map((pdf) => (
                                <div
                                    key={pdf.id}
                                    onClick={() => handlePreviewPdf(pdf)}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                                        selectedPdf?.id === pdf.id
                                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 shadow-md ring-2 ring-blue-200 dark:ring-blue-700'
                                            : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                                                {pdf.fileName}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {pdf.createdDate}
                                            </p>
                                            {selectedPdf?.id === pdf.id && (
                                                <div className="flex items-center gap-1 mt-2">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                                    <span className="text-xs text-blue-600 dark:text-blue-400">Görüntüleniyor</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex gap-1 ml-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePreviewPdf(pdf);
                                                }}
                                                className="h-8 w-8 p-0"
                                                title="Önizle"
                                            >
                                                <Eye className="w-3 h-3" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDownload(pdf.id, pdf.fileName);
                                                }}
                                                className="h-8 w-8 p-0"
                                                title="İndir"
                                            >
                                                <Download className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {pdfs.length === 0 && (
                            <div className="text-center py-8">
                                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-500 dark:text-gray-400">Henüz PDF dosyanız yok</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}