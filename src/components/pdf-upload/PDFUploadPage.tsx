import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// Set up PDF.js worker
// @ts-ignore
GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

function PDFUploadPage() {
  const [pdfText, setPdfText] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setPdfText("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async function () {
      const arrayBuffer = this.result as ArrayBuffer;
      const typedArray = new Uint8Array(arrayBuffer);
      const pdfDoc = await getDocument({ data: typedArray }).promise;
      let extractedText = "";
      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const content = await page.getTextContent();
        extractedText += content.items.map((item: any) => item.str).join(" ");
      }
      setPdfText(extractedText);
      setLoading(false);

      // Send resume context to Altair via navigation state
      navigate("/agent", { state: { resumeContext: extractedText } });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="mb-4">Upload PDF Document</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button
          type="submit"
          disabled={!file || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
      {pdfText && (
        <textarea
          value={pdfText}
          readOnly
          rows={10}
          className="mt-4 w-full"
        />
      )}
    </div>
  );
}

export default PDFUploadPage;