import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};
export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "yud0uhu.dev";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: `url(${`data:image/svg+xml,${encodeURIComponent(
              '<svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><defs><filter id="blur1" x="-10%" y="-10%" width="120%" height="120%"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="161" result="effect1_foregroundBlur"></feGaussianBlur></filter></defs><rect width="900" height="600" fill="#6600FF"></rect><g filter="url(#blur1)"><circle cx="272" cy="574" fill="#00CC99" r="357"></circle><circle cx="664" cy="451" fill="#6600FF" r="357"></circle><circle cx="430" cy="231" fill="#00CC99" r="357"></circle><circle cx="461" cy="574" fill="#00CC99" r="357"></circle><circle cx="100" cy="248" fill="#6600FF" r="357"></circle><circle cx="841" cy="110" fill="#00CC99" r="357"></circle></g></svg>'
            )}`})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "100% 100%",
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "800px",
              height: "500px",
              background: "#fff",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "40px",
                textShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
                textAlign: "center",
              }}
            >
              {title}
            </p>
          </div>
        </div>
      ),
      {
        width: 900,
        height: 600,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
