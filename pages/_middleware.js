import { NextResponse } from "next/server";

const hosts = {
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

  if (
    url.pathname.startsWith(`/_sites`) || // prevent access to _sites/* path
    !siteId // no siteId for hostname
  ) {
    return new Response(null, { status: 404 });
  }

  if (url.pathname === "/blog") {
    url.pathname += "/page/1";
  }

  // Rewrite to the current hostname under the pages/sites folder
  url.pathname = `/_sites/${siteId}${url.pathname}`;

  return NextResponse.rewrite(url);
}
