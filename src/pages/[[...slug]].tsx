import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import {
  getAllPages,
  getPageBySlug,
  isCopySection,
  isFranchiseSection,
  isRichTextSection,
} from "lib/contentful";
import styles from "styles/Home.module.css";
import { type Document } from "@contentful/rich-text-types";
import stringify from "fast-safe-stringify";
import { Gallery } from "modules/Gallery";
import { Franchise } from "modules/Franchise";
import { RichText } from "modules/RichText";
import { Copy } from "modules/Copy";

interface HomeProps {
  id: string;
  slug: string;
  title: string;
  sections: Section[];
}

type Section =
  | {
      id: string;
      title: string;
      description: Document;
      type: "componentRichText";
    }
  | {
      id: string;
      title: string;
      description: Document;
      type: "componentCopy";
    }
  | {
      id: string;
      title: string;
      description: Document;
      type: "componentFranchise";
    }
  | {
      id: string;
      photos: {
        url: string;
        width: number;
        height: number;
      }[];
      type: "componentGallery";
    };

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {props.sections.map((section) => {
          switch (section.type) {
            case "componentCopy":
              return <Copy key={section.id} {...section} />;
            case "componentRichText":
              return <RichText key={section.id} {...section} />;
            case "componentFranchise":
              return <Franchise key={section.id} {...section} />;
            case "componentGallery": {
              return <Gallery key={section.id} {...section} />;
            }
            default:
              return null;
          }
        })}
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (props) => {
  const entries = await getAllPages();

  return {
    paths: entries.items.map((item) => ({
      params: {
        slug: item.fields.slug.split("/").filter((value) => value !== ""),
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  HomeProps,
  { slug?: string[] }
> = async (props) => {
  const response = await getPageBySlug(
    props.params?.slug?.join("/"),
    props.locale,
    props.preview
  );

  if (response.items.length === 0) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  const entry = response.items[0];

  return {
    props: {
      ...entry.fields,
      id: entry.sys.id,
      // TODO: Identify nicer way to do this
      sections: entry.fields.sections
        ? entry.fields.sections.map((section) => {
            if (isRichTextSection(section)) {
              // Hack to resolve circular dependency issue
              const fields: typeof section.fields = JSON.parse(
                stringify(section.fields)
              );

              return {
                ...fields,
                id: section.sys.id,
                type: section.sys.contentType.sys.id,
              };
            } else if (isCopySection(section)) {
              // Hack to resolve circular dependency issue
              const fields: typeof section.fields = JSON.parse(
                stringify(section.fields)
              );

              return {
                ...fields,
                id: section.sys.id,
                type: section.sys.contentType.sys.id,
              };
            } else if (isFranchiseSection(section)) {
              // Hack to resolve circular dependency issue
              const fields: typeof section.fields = JSON.parse(
                stringify(section.fields)
              );

              return {
                ...fields,
                id: section.sys.id,
                type: section.sys.contentType.sys.id,
              };
            } else {
              // Hack to resolve circular dependency issue
              const fields: typeof section.fields = JSON.parse(
                stringify(section.fields)
              );

              return {
                ...fields,
                id: section.sys.id,
                type: section.sys.contentType.sys.id,
                photos: fields.photos.map((photo) => ({
                  url: photo.fields.file.url,
                  width: photo.fields.file.details.image.width,
                  height: photo.fields.file.details.image.height,
                })),
              };
            }
          })
        : [],
    },
    revalidate: 10,
  };
};
