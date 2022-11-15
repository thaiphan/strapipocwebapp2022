import Image from "next/image";
import styles from "./Gallery.module.css";
import { type Gallery as GalleryProps } from "lib/strapi";

export const Gallery = (props: GalleryProps) => {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        {props.Photos.data.map((photo) => (
          <div key={photo.id} className={styles["image-container"]}>
            <Image
              alt=""
              src={`${process.env.NEXT_PUBLIC_ASSET_HOST}${photo.attributes.url}`}
              fill
              className={styles.image}
              sizes="(max-width: 640px) 543px, (max-width: 1024) 452px, 411px"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
