import { type RichText as RichTextProps } from "lib/strapi";

import styles from "./RichText.module.css";

export const RichText = (props: RichTextProps) => {
  return (
    <section>
      <div className={styles.container}>
        <h1>{props.Title}</h1>
        <div>{props.Description}</div>
      </div>
    </section>
  );
};
