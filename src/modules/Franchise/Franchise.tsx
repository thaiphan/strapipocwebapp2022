import { type Document } from "@contentful/rich-text-types";
import { RichText } from "components/RichText";
import Image from "next/image";
import Link from "next/link";
import styles from "./Franchise.module.css";

interface FranchiseProps {
  title: string;
  description: Document;
  background?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  ctaTitle?: string;
  ctaLink?: {
    fields: {
      slug: string;
    };
  };
}

export const Franchise = (props: FranchiseProps) => {
  return (
    <section
      className={styles.root}
      style={{
        backgroundImage: props.background
          ? `url(https:${props.background.fields.file.url})`
          : undefined,
      }}
    >
      <div className={styles.container}>
        <div className={styles.panel}>
          <h2>{props.title}</h2>
          <RichText field={props.description} />
          {props.ctaLink && props.ctaTitle ? (
            <Link
              className={styles.cta}
              href={`/${props.ctaLink?.fields.slug}`}
            >
              {props.ctaTitle}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
};
