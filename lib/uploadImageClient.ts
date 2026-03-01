/**
 * Client-side Cloudinary upload using unsigned preset.
 * Uploads directly from browser to Cloudinary - no server round-trip for the file.
 * Requires "techno" upload preset to be configured as unsigned in Cloudinary dashboard.
 */
export async function uploadImageClient(file: File): Promise<{
  url?: string;
  success: boolean;
  error?: string;
}> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    return { success: false, error: "Cloudinary not configured" };
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "techno");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    return {
      success: false,
      error: `Upload failed: ${response.statusText}`,
    };
  }

  const data = (await response.json()) as { secure_url?: string };
  return { url: data.secure_url, success: true };
}
