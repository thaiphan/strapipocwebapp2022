import { type Document } from "@contentful/rich-text-types";
import { RichText as RichTextComp } from "components/RichText";

import styles from "./RichText.module.css";

interface RichTextProps {
  title: string;
  description: Document;
}

export const RichText = (props: RichTextProps) => {
  return (
    <section>
      <div className={styles.container}>
        <h1>{props.title}</h1>
        <RichTextComp field={props.description} />
      </div>
    </section>
  );
};
