import styles from "./Copy.module.css";
import { type Copy as CopyProps } from "lib/strapi";

export const Copy = (props: CopyProps) => {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div>
          <h1>{props.Title}</h1>
        </div>
        <div>{props.Description}</div>
      </div>
    </section>
  );
};
