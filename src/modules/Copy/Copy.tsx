import styles from "./Copy.module.css";
import { type Copy as CopyProps } from "lib/strapi";
import { RichText } from "components/RichText";

export const Copy = (props: CopyProps) => {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div>
          <h1>{props.Title}</h1>
        </div>
        <RichText field={props.Description} />
      </div>
    </section>
  );
};
