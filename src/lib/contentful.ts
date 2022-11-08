import * as contentful from "contentful";
import { type Document } from "@contentful/rich-text-types";
import { type EntriesQueries } from "contentful";

const contentfulClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

const previewClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: "preview.contentful.com",
});

export const getAllEntries = () => {
  return contentfulClient.getEntries<ContentfulPage>({
    content_type: "page",
  });
};

export const getEntryBySlug = (
  slug: string = "/",
  locale = "en",
  preview = false
) => {
  const payload: EntriesQueries<ContentfulPage> = {
    content_type: "page",
    "fields.slug": slug,
    limit: 1,
    include: 2,
    locale,
  };

  if (preview) {
    return previewClient.getEntries<ContentfulPage>(payload);
  } else {
    return contentfulClient.getEntries<ContentfulPage>(payload);
  }
};

interface ContentfulPage {
  slug: string;
  title: string;
  sections?: ContentfulPageSection[];
}

type ContentfulPageSection =
  | ContentfulPageSectionCopy
  | ContentfulPageSectionRichText
  | ContentfulPageSectionFranchise
  | ContentfulPageSectionGallery;

interface ContentfulPageSectionRichText {
  fields: {
    title: string;
    description: Document;
  };
  sys: {
    id: string;
    contentType: {
      sys: {
        id: "componentRichText";
      };
    };
  };
}

interface ContentfulPageSectionFranchise {
  fields: {
    title: string;
    description: Document;
  };
  sys: {
    id: string;
    contentType: {
      sys: {
        id: "componentFranchise";
      };
    };
  };
}

interface ContentfulPageSectionCopy {
  fields: {
    title: string;
    description: Document;
  };
  sys: {
    id: string;
    contentType: {
      sys: {
        id: "componentCopy";
      };
    };
  };
}

interface ContentfulPageSectionGallery {
  fields: {
    photos: {
      fields: {
        title: string;
        description: string;
        file: {
          url: string;
          details: {
            image: {
              width: number;
              height: number;
            };
          };
        };
      };
    }[];
  };
  sys: {
    id: string;
    contentType: {
      sys: {
        id: "componentGallery";
      };
    };
  };
}

export const isRichTextSection = (
  b: ContentfulPageSection
): b is ContentfulPageSectionRichText =>
  b.sys.contentType.sys.id === "componentRichText";

export const isCopySection = (
  b: ContentfulPageSection
): b is ContentfulPageSectionCopy =>
  b.sys.contentType.sys.id === "componentCopy";

export const isFranchiseSection = (
  b: ContentfulPageSection
): b is ContentfulPageSectionFranchise =>
  b.sys.contentType.sys.id === "componentFranchise";
