// components/checkout/steps/2_DocsStep.tsx
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import DocumentUploader from "./DocumentUploader";
import { useDocumentUpload, RequiredDoc, UploadedDoc } from "./useDocumentUpload";
import React, { useEffect } from "react";

type Props = {
  userId: string;
  cartId: string;
  requiredDocs: RequiredDoc[];
  uploadedDocs?: UploadedDoc[];
  onDocumentsComplete: (docs: UploadedDoc[]) => void;
};

export default function DocsStep({
  userId,
  cartId,
  requiredDocs = [],
  uploadedDocs = [],
  onDocumentsComplete,
}: Props) {
  // Initialize the upload state with already uploaded docs if present (for persistence)
  const {
    uploads,
    remove,
    handleFile,
    uploadedCount,
    isAllUploaded,
  } = useDocumentUpload({
    userId,
    cartId,
    requiredDocs,
    uploadedDocs, // pass in the persisted docs
    onAllUploaded: onDocumentsComplete,
  });

  // Keep parent state (wizard) in sync with our uploads array (even partial)
  useEffect(() => {
    onDocumentsComplete(uploads);
    // eslint-disable-next-line
  }, [uploads]);

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <CardTitle className="mb-2">Upload Required Documents</CardTitle>
        <p className="text-sm text-slate-500 mb-4">
          {requiredDocs.length === 0
            ? "No documents required for your selected services."
            : <>Please upload <b>{requiredDocs.length}</b> document{requiredDocs.length > 1 && "s"} for your selected services.</>
          }
        </p>
        {requiredDocs.length > 0 && (
          <>
            {/* Summary progress bar */}
            <Progress value={(uploadedCount / requiredDocs.length) * 100} className="w-full mb-4" />
            <div className="mb-4 text-sm text-slate-500 text-right">
              {uploadedCount} of {requiredDocs.length} required document(s) uploaded
            </div>
            {/* Per-document uploaders */}
            <div className="mb-6">
              {requiredDocs.map(doc => (
                <DocumentUploader
                  key={doc.id}
                  doc={doc}
                  upload={uploads.find(u => u.id === doc.id) ?? { id: doc.id, status: "idle", progress: 0 }}
                  onFileChange={handleFile}
                  onRemove={remove}
                />
              ))}
            </div>
            {!isAllUploaded && (
              <div className="text-sm text-yellow-700 mt-2">
                Please upload all required documents to proceed.
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
