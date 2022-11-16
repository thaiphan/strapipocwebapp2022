import Link from "next/link";
import styles from "./Franchise.module.css";
import { type Franchise as FranchiseProps } from "lib/strapi";
import { RichText } from "components/RichText";

export const Franchise = (props: FranchiseProps) => {
  return (
    <section
      className={styles.root}
      style={{
        backgroundImage: props.Background
          ? `url(${process.env.NEXT_PUBLIC_ASSET_HOST}${props.Background.data.attributes.url})`
          : undefined,
      }}
    >
      <div className={styles.container}>
        <div className={styles.panel}>
          <h2>{props.Title}</h2>
          <RichText field={props.Description} />
          {props.ctaLink && props.ctaTitle ? (
            <Link className={styles.cta} href={props.ctaLink}>
              {props.ctaTitle}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
};
