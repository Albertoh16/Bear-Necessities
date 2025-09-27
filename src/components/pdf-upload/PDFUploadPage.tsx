import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";

// @ts-ignore
GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

function PDFUploadPage() {
  const [pdfText, setPdfText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { setConfig, config } = useLiveAPIContext(); // <-- get config

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setPdfText("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async function () {
      const typedarray = new Uint8Array(this.result as ArrayBuffer);
      const pdf = await getDocument({ data: typedarray }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ");
      }
      setPdfText(text);
      setLoading(false);

      // Update Altair systemInstruction
      setConfig({
        ...config,
        systemInstruction: {
          parts: [
            {
              text:
                "PDF context: " +
                text +
                "\n\n" +
                ((config as any)?.systemInstruction?.parts?.[0]?.text || ""),
            },
          ],
        },
      });

      // Navigate to Altair page
      navigate("/agent");
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