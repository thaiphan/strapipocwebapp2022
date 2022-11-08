import Image from "next/image";
import styles from "./Gallery.module.css";

interface GalleryProps {
  photos: {
    url: string;
    width: number;
    height: number;
  }[];
}

export const Gallery = (props: GalleryProps) => {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        {props.photos.map((photo) => (
          <div key={photo.url} className={styles["image-container"]}>
            <Image
              alt=""
              src={`https:${photo.url}`}
              fill
              // height={412}
              // width={412}
              className={styles.image}
              sizes="(max-width: 640px) 543px, (max-width: 1024) 452px, 411px"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
