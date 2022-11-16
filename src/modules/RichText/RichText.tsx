import { type RichText as RichTextProps } from "lib/strapi";
import { RichText as RichTextComp } from "components/RichText";

import styles from "./RichText.module.css";

export const RichText = (props: RichTextProps) => {
  return (
    <section>
      <div className={styles.container}>
        <h1>{props.Title}</h1>
        <div>
          <RichTextComp field={props.Description} />
        </div>
      </div>
    </section>
  );
};
