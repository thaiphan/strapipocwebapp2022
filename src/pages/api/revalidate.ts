import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // should be secret, custom header coming in from Contentful
  let inboundRevalToken = req.headers["x-vercel-reval-key"];

  // Check for secret to confirm this is a valid request
  if (!inboundRevalToken) {
    return res
      .status(401)
      .json({ message: "x-vercel-reval-key header not defined" });
  } else if (inboundRevalToken !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const slugs: string[] = Object.values(req.body.fields.slug);

    for (let i = 0; i < slugs.length; i++) {
      const slug = slugs[i];
      await res.revalidate(slug);
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
