import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { UploadCloud, X, CheckCircle2 } from "lucide-react";
import { RequiredDoc, UploadedDoc } from "./useDocumentUpload";
import React from "react";

interface Props {
  doc: RequiredDoc;
  upload: UploadedDoc;
  onFileChange: (doc: RequiredDoc, file: File) => void;
  onRemove: (docId: string) => void;
}

export default function DocumentUploader({ doc, upload, onFileChange, onRemove }: Props) {
  const inputId = `file-upload-${doc.id}`;

  // Debug: log upload state every render for this doc
  if (typeof window !== "undefined") {
    // This won't spam the console in SSR
    console.log(
      `[DocumentUploader:${doc.id}] status:`, upload.status, "progress:", upload.progress
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 border rounded-lg p-4 mb-3 bg-slate-50">
      <div className="flex-1">
        <label htmlFor={inputId} className="block font-medium mb-1">
          {doc.label}
          {doc.required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center gap-2">
          <input
            id={inputId}
            type="file"
            accept={doc.accept.join(",")}
            style={{ display: "none" }}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) onFileChange(doc, file);
            }}
            aria-label={`Upload file for ${doc.label}`}
          />
          <Button
            asChild
            variant={upload.status === "success" ? "success" : "outline"}
            size="sm"
            tabIndex={0}
            aria-label={`Choose file for ${doc.label}`}
          >
            <label htmlFor={inputId} className="cursor-pointer flex items-center gap-1">
              <UploadCloud className="w-5 h-5" />
              {upload.file ? "Replace" : "Upload"}
            </label>
          </Button>
          {upload.file && (
            <span className="text-sm text-slate-600">
              {upload.file.name} ({(upload.file.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          )}
          {upload.status === "success" && (
            <CheckCircle2 className="text-green-500 w-5 h-5 ml-1" aria-label="Upload complete" />
          )}
          {upload.file && (
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              aria-label={`Remove file for ${doc.label}`}
              onClick={() => onRemove(doc.id)}
              tabIndex={0}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        {/* Upload progress bar and percent */}
        {upload.status === "uploading" && (
          <div className="w-full flex items-center gap-2 mt-2">
            <div className="flex-1 bg-gray-200 rounded h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded"
                style={{
                  width: `${upload.progress}%`,
                  transition: "width 0.3s",
                }}
              />
            </div>
            <span className="text-xs text-slate-500 w-10 text-right">{Math.round(upload.progress)}%</span>
          </div>
        )}

        {upload.error && (
          <div className="text-red-600 text-xs mt-1">{upload.error}</div>
        )}
      </div>
    </div>
  );
}
