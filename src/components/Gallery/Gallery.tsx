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
          <Image
            key={photo.url}
            alt=""
            src={`https:${photo.url}`}
            height={412}
            width={412}
            style={{
              objectFit: "cover",
            }}
          />
        ))}
      </div>
    </section>
  );
};
