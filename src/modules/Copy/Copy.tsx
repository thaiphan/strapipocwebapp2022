import { RichText } from "components/RichText";
import styles from "./Copy.module.css";
import { type Document } from "@contentful/rich-text-types";

interface CopyProps {
  title: string;
  description: Document;
}

export const Copy = (props: CopyProps) => {
  console.log(props);
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div>
          <h1>{props.title}</h1>
        </div>
        <RichText field={props.description} />
      </div>
    </section>
  );
};
