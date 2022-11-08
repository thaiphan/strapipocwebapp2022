import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, type Document } from "@contentful/rich-text-types";
import Link from "next/link";
import Image from "next/image";
import styles from "./RichText.module.css";

interface RichTextProps {
  field: Document;
}

export const RichText = (props: RichTextProps) => {
  return <>{documentToReactComponents(props.field, options)}</>;
};

const options: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <div
          className={styles.imageContainer}
          style={{
            aspectRatio:
              node.data.target.fields.file.details.image.width /
              node.data.target.fields.file.details.image.height,
            maxWidth: node.data.target.fields.file.details.image.width,
          }}
        >
          <Image
            alt={node.data.target.fields.title}
            src={`https:${node.data.target.fields.file.url}`}
            fill
            className={styles.image}
            // height={node.data.target.fields.file.details.image.height}
            // width={node.data.target.fields.file.details.image.width}
          />
        </div>
      );
    },
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      return <Link href={node.data.target.fields.slug}>{children}</Link>;
    },
  },
};
