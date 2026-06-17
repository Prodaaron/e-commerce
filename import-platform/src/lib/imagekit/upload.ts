interface ImageKitAuthResponse {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
}

interface ImageKitUploadResponse {
  url: string;
  fileId: string;
  name: string;
}

async function getErrorMessage(response: Response) {
  try {
    const data = await response.json();

    if (typeof data?.message === "string") {
      return data.message;
    }

    if (typeof data?.error?.message === "string") {
      return data.error.message;
    }
  } catch {
    return response.statusText;
  }

  return response.statusText;
}

export async function uploadImageToImageKit(
  file: File,
  folder = "/products"
) {
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  if (!urlEndpoint) {
    throw new Error("ImageKit URL endpoint is not configured");
  }

  const authResponse = await fetch("/api/imagekit/auth");

  if (!authResponse.ok) {
    const message = await getErrorMessage(authResponse);

    throw new Error(message || "Failed to prepare image upload");
  }

  const auth = (await authResponse.json()) as ImageKitAuthResponse;
  const formData = new FormData();

  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("folder", folder);
  formData.append("publicKey", auth.publicKey);
  formData.append("signature", auth.signature);
  formData.append("expire", String(auth.expire));
  formData.append("token", auth.token);

  const uploadResponse = await fetch(
    "https://upload.imagekit.io/api/v1/files/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!uploadResponse.ok) {
    const message = await getErrorMessage(uploadResponse);

    throw new Error(message || "Image upload failed");
  }

  const uploaded = (await uploadResponse.json()) as ImageKitUploadResponse;

  return uploaded.url;
}
