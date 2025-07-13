import { useCallback, useEffect, useRef, useState } from "react";
import isEqual from "lodash.isequal"; // Make sure to `npm i lodash.isequal`

export type RequiredDoc = {
  id: string;
  label: string;
  accept: string[];
  maxSizeMB: number;
  required: boolean;
  description?: string;
};

export type UploadedDoc = {
  id: string;
  file?: File;
  url?: string;
  status: "idle" | "uploading" | "success" | "error";
  progress: number;
  error?: string | null;
};

export function useDocumentUpload({
  userId,
  cartId,
  requiredDocs,
  uploadedDocs = [],
  onAllUploaded,
}: {
  userId: string;
  cartId: string;
  requiredDocs: RequiredDoc[];
  uploadedDocs?: UploadedDoc[];
  onAllUploaded?: (all: UploadedDoc[]) => void;
}) {
  const [uploads, setUploads] = useState<UploadedDoc[]>([]);
  const prevDocIdsRef = useRef<string[]>([]);

  // Only initialize uploads if requiredDocs (ids) actually change
  useEffect(() => {
    const currentDocIds = requiredDocs.map(doc => doc.id).sort();
    if (!isEqual(currentDocIds, prevDocIdsRef.current)) {
      prevDocIdsRef.current = currentDocIds;
      const byId = (uploadedDocs || []).reduce<Record<string, UploadedDoc>>(
        (acc, u) => ({ ...acc, [u.id]: u }),
        {}
      );
      setUploads(
        requiredDocs.map((doc) =>
          byId[doc.id] ?? { id: doc.id, status: "idle", progress: 0, error: null }
        )
      );
    }
    // eslint-disable-next-line
  }, [requiredDocs, uploadedDocs]);

  // Keep parent (wizard) state in sync
  useEffect(() => {
    onAllUploaded?.(uploads);
    // eslint-disable-next-line
  }, [uploads, onAllUploaded]);

  const remove = useCallback((docId: string) => {
    setUploads((prev) =>
      prev.map((u) =>
        u.id === docId
          ? { ...u, file: undefined, url: undefined, status: "idle", progress: 0, error: null }
          : u
      )
    );
  }, []);

  const upload = useCallback((doc: RequiredDoc, file: File) => {
    // Validate type
    if (!doc.accept.includes(file.type)) {
      setUploads((prev) =>
        prev.map((u) =>
          u.id === doc.id
            ? { ...u, error: `Invalid file type: ${file.type}`, status: "error", progress: 0 }
            : u
        )
      );
      return;
    }
    // Validate size
    if (file.size > doc.maxSizeMB * 1024 * 1024) {
      setUploads((prev) =>
        prev.map((u) =>
          u.id === doc.id
            ? { ...u, error: `File too large (max ${doc.maxSizeMB}MB)`, status: "error", progress: 0 }
            : u
        )
      );
      return;
    }

    setUploads((prev) =>
      prev.map((u) =>
        u.id === doc.id
          ? { ...u, file, status: "uploading", progress: 0, error: null }
          : u
      )
    );

    // Animate progress
    let progress = 0;
    const uploadId = doc.id;
    const interval = setInterval(() => {
      progress += 20 + Math.random() * 20;
      setUploads((prev) =>
        prev.map((u) =>
          u.id === uploadId
            ? { ...u, progress: Math.min(progress, 100) }
            : u
        )
      );
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploads((prev) =>
            prev.map((u) =>
              u.id === uploadId
                ? { ...u, status: "success", progress: 100, url: `/mock-uploads/${file.name}`, error: null }
                : u
            )
          );
        }, 250);
      }
    }, 200);

    // TODO: Replace above with real upload API if needed
  }, []);

  const handleFile = useCallback((doc: RequiredDoc, file: File) => {
    upload(doc, file);
  }, [upload]);

  const uploadedCount = uploads.filter((u) => u.status === "success").length;
  const isAllUploaded =
    requiredDocs.length > 0 &&
    requiredDocs.every((doc) =>
      uploads.find((u) => u.id === doc.id && u.status === "success")
    );

  return {
    uploads,
    remove,
    handleFile,
    uploadedCount,
    isAllUploaded,
    errorMap: Object.fromEntries(uploads.map((u) => [u.id, u.error])),
  };
}
