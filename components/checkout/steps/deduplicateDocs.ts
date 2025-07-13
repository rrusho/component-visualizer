import { RequiredDoc } from "./useDocumentUpload";

// Ensures every doc has a unique ID, even for same-type docs across services
export function deduplicateDocs(docs: RequiredDoc[]): RequiredDoc[] {
  const idCount: Record<string, number> = {};
  return docs.map((doc) => {
    // Generate a base ID from the original id (if present) or the label
    const baseId = doc.id || doc.label.replace(/\s+/g, "_").toLowerCase();
    idCount[baseId] = (idCount[baseId] || 0) + 1;
    // If a duplicate, append a counter: "utility_bill_2"
    return {
      ...doc,
      id: idCount[baseId] > 1 ? `${baseId}_${idCount[baseId]}` : baseId,
    };
  });
}
