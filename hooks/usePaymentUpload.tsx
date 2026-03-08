import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { uploadImageClient } from "@/lib/uploadImageClient";

const UPLOAD_DEBOUNCE_MS = 600;
const MAX_SIZE_KB = 250;

export interface UsePaymentUploadReturn {
  uploadedImageUrl: string | null;
  uploadError: string | null;
  isUploading: boolean;
}

export function usePaymentUpload(
  file: File | undefined | null
): UsePaymentUploadReturn {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const currentFileRef = useRef<File | null>(null);

  useEffect(() => {
    setUploadError(null);
    setUploadedImageUrl(null);

    if (!file) {
      setIsUploading(false);
      currentFileRef.current = null;
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      return;
    }

    currentFileRef.current = file;

    if (file.size > MAX_SIZE_KB * 1024) {
      const errorMessage = `File size must be ${MAX_SIZE_KB}KB or less. Your file is ${(file.size / 1024).toFixed(0)}KB.`;
      setUploadError(errorMessage);
      toast.error(errorMessage);
      setIsUploading(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      debounceRef.current = null;
      const fileToUpload = currentFileRef.current;
      if (!fileToUpload || fileToUpload !== file) return;

      setIsUploading(true);
      const result = await uploadImageClient(fileToUpload);

      // Bail out if a newer file was selected while we were uploading
      if (currentFileRef.current !== fileToUpload) return;

      if (result.success && result.url) {
        setUploadedImageUrl(result.url);
        setUploadError(null);
      } else {
        setUploadedImageUrl(null);
        const errorMessage = result.error ?? "Upload failed";
        setUploadError(errorMessage);
        toast.error(errorMessage);
      }
      setIsUploading(false);
    }, UPLOAD_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [file]);

  return { uploadedImageUrl, uploadError, isUploading };
}
