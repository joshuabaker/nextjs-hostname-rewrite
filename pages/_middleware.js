import { NextResponse } from "next/server";

const hosts = {
  "nextjs-hostname-rewrite.vercel.app": "0",
  "host1.testingwebsite.co": "1",
  "host2.testingwebsite.co": "2",
};

export default function middleware(req) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host");

  if (
    url.pathname.includes(".") || // exclude file paths (e.g. public folder)
    url.pathname.startsWith("/api") || // exclude all API routes
    req.headers.has("x-prerender-revalidate") // exclude revalidate requests
  ) {
    return undefined; // Do nothing
  }

  const siteId = hosts[hostname];

  if (url.pathname.startsWith(`/_sites`) || !siteId) {
    return new Response(null, { status: 404 });
  }

  if (url.pathname === "/blog") {
    url.pathname += "/page/1";
  }

  url.pathname = `/_sites/${siteId}${url.pathname}`;

  return NextResponse.rewrite(url);
}
