import { randomUUID, createHmac } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const missingKeys = [
    !privateKey && "IMAGEKIT_PRIVATE_KEY",
    !publicKey && "NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY",
  ].filter(Boolean);

  if (missingKeys.length > 0) {
    return NextResponse.json(
      {
        message: `ImageKit is not configured. Missing: ${missingKeys.join(
          ", "
        )}`,
      },
      { status: 500 }
    );
  }

  const token = randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 20 * 60;
  const signature = createHmac("sha1", privateKey!)
    .update(token + expire)
    .digest("hex");

  return NextResponse.json({
    token,
    expire,
    signature,
    publicKey,
  });
}
