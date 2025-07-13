// components/checkout/steps/validateDocument.ts
import { RequiredDoc } from "./useDocumentUpload";

export function validateDocument(file: File, doc: RequiredDoc): string | null {
  if (!doc.accept.includes(file.type)) {
    return `Invalid file type: ${file.type}`;
  }
  if (file.size > doc.maxSizeMB * 1024 * 1024) {
    return `File too large (max ${doc.maxSizeMB}MB)`;
  }
  return null;
}
