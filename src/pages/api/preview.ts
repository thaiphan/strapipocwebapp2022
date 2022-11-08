import type { NextApiRequest, NextApiResponse } from "next";
import { getPageBySlug } from "lib/contentful";

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret, slug } = req.query;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const post = await getPageBySlug(
    Array.isArray(slug) ? slug.join("/") : slug,
    undefined,
    true
  );

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  res.redirect(307, "/" + post.items[0].fields.slug.replace(/^\//g, ""));
}
