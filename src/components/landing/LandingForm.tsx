/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { useInterviewStore } from "../../store/interview-store";
import cn from "classnames";

// Set up PDF.js worker
// @ts-ignore
GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

export default function LandingForm() {
  const navigate = useNavigate();
  const {
    interviewData,
    setResumeText,
    setInterviewType,
    setJobRole,
    setCompany,
    isFormValid,
  } = useInterviewStore();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setLoading(true);
    setUploadStatus("idle");

    try {
      const reader = new FileReader();
      reader.onload = async function () {
        try {
          const arrayBuffer = this.result as ArrayBuffer;
          const typedArray = new Uint8Array(arrayBuffer);
          const pdfDoc = await getDocument({ data: typedArray }).promise;
          
          let extractedText = "";
          for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            const page = await pdfDoc.getPage(pageNum);
            const content = await page.getTextContent();
            extractedText += content.items.map((item: any) => item.str).join(" ");
          }
          
          setResumeText(extractedText);
          setUploadStatus("success");
        } catch (error) {
          console.error("Error processing PDF:", error);
          setUploadStatus("error");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    } catch (error) {
      console.error("Error reading file:", error);
      setUploadStatus("error");
      setLoading(false);
    }
  };

  const handleStartInterview = () => {
    if (!isFormValid()) return;
    
    navigate("/agent", {
      state: {
        resumeContext: interviewData.resumeText,
        interviewType: interviewData.interviewType,
        jobRole: interviewData.jobRole,
        company: interviewData.company,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        Ready to Practice?
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Fill out the form below to start your interview session
      </p>

      <div className="space-y-6">
        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume (PDF) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
              disabled={loading}
            />
            <label
              htmlFor="resume-upload"
              className={cn(
                "flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                {
                  "border-gray-300 hover:border-gray-400": uploadStatus === "idle",
                  "border-green-300 bg-green-50": uploadStatus === "success",
                  "border-red-300 bg-red-50": uploadStatus === "error",
                  "opacity-50 cursor-not-allowed": loading,
                }
              )}
            >
              {loading ? (
                <span className="text-gray-600">Processing PDF...</span>
              ) : file ? (
                <span className={cn("text-sm", {
                  "text-green-700": uploadStatus === "success",
                  "text-red-700": uploadStatus === "error",
                  "text-gray-700": uploadStatus === "idle",
                })}>
                  {uploadStatus === "success" && "✓ "}
                  {uploadStatus === "error" && "✗ "}
                  {file.name}
                </span>
              ) : (
                <span className="text-gray-500">Choose File</span>
              )}
            </label>
          </div>
        </div>

        {/* Interview Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interview Type <span className="text-red-500">*</span>
          </label>
          <select
            value={interviewData.interviewType}
            onChange={(e) => setInterviewType(e.target.value as "behavioral" | "technical")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select interview type</option>
            <option value="behavioral">Behavioral</option>
            <option value="technical">Technical</option>
          </select>
        </div>

        {/* Job Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={interviewData.jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="e.g., Software Engineer, Product Manager"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={interviewData.company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g., Google, Microsoft, Startup Inc."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartInterview}
          disabled={!isFormValid() || loading}
          className={cn(
            "w-full py-3 px-4 rounded-lg font-medium transition-colors",
            {
              "bg-green-600 hover:bg-green-700 text-white": isFormValid() && !loading,
              "bg-gray-300 text-gray-500 cursor-not-allowed": !isFormValid() || loading,
            }
          )}
        >
          {loading ? "Processing..." : "Start Interview"}
        </button>
      </div>
    </div>
  );
}