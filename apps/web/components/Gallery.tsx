import React, { useState, MouseEventHandler, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "lightbox.js-react/dist/index.css";
import { SlideshowLightbox, initLightboxJS } from "lightbox.js-react";

export const GalleryIntro = () => {
  const t = useTranslations();
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <iframe
        className="top-50 left-50 -translate-x-50% -translate-y-50% absolute hidden h-auto min-h-full w-auto min-w-full transform lg:block"
        src="https://www.youtube.com/embed/pY2CWYxUbrM?start=60&autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=pY2CWYxUbrM"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="absolute inset-0 bg-[url('/gallerysmallscreen.webp')] bg-cover bg-center bg-fixed lg:hidden "></div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 text-center">
        <div>
          <h1 className="mb-4 text-3xl text-white lg:text-5xl">
            {t.rich(`gallery.hero.title`, {
              large: (chunks) => (
                <span className="text-5xl lg:text-7xl">{chunks}</span>
              ),
            })}
          </h1>
        </div>
      </div>
    </div>
  );
};

type ImageGridItemProps = {
  src: string;
  alt: string;
  className?: string;
  onClick: () => void;
};

const ImageGridItem: React.FC<ImageGridItemProps> = ({
  src,
  alt,
  className,
  onClick,
}) => (
  <div onClick={onClick} className={`relative h-full rounded ${className}`}>
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: "cover" }}
      className="rounded"
    />
  </div>
);

export const GalleryGrid = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [startingIndex, setStartingIndex] = useState(0);
  const t = useTranslations();
  useEffect(() => {
    initLightboxJS(`${process.env.LIGHTBOX_KEY}`, "individual");
  });

  const images = [
    {
      src: "/gal1.jpg",
      alt: "Image 1",
    },
    {
      src: "/gal2.jpg",
      alt: "Image 2",
    },
    {
      src: "/gal3.jpg",
      alt: "Image 3",
    },
    {
      src: "/gal4.jpg",
      alt: "Image 4",
    },
    {
      src: "/gal5.jpg",
      alt: "Image 5",
    },
    {
      src: "/gal6.jpg",
      alt: "Image 6",
    },
    {
      src: "/gal7.jpg",
      alt: "Image 7",
    },
    {
      src: "/gal8.jpg",
      alt: "Image 8",
    },
    {
      src: "/gal9.jpg",
      alt: "Image 9",
    },
  ];
  const handleImageClick = (index) => {
    setStartingIndex(index);
    setIsOpen(true);
  };
  const SlideshowLightboxComponent = SlideshowLightbox as React.ElementType;

  return (
    <>
      <div className="relative flex w-full justify-center">
        <SlideshowLightboxComponent
          open={isOpen}
          startingSlideIndex={startingIndex}
          images={images}
          onClose={() => setIsOpen(false)}
          lightboxIdentifier="lbox1"
          theme="lightbox"
          iconColor="#DDA771"
        />
        <div className="my-10 grid h-screen w-full grid-cols-2 grid-rows-6 gap-4 p-4 md:w-11/12 md:grid-cols-3 md:grid-rows-4 md:p-10">
          <ImageGridItem
            src="/gal1.jpg"
            alt="Image 1"
            className="col-span-2 row-span-6 rounded md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-4"
            onClick={() => handleImageClick(0)}
          />
          <ImageGridItem
            src="/gal2.jpg"
            alt="Image 2"
            className="col-start-1 col-end-2 rounded md:col-start-1 md:col-end-2 md:row-start-4 md:row-end-5"
            onClick={() => handleImageClick(1)}
          />
          <ImageGridItem
            src="/gal3.jpg"
            alt="Image 3"
            className="col-start-2 col-end-3 row-span-1 rounded md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2"
            onClick={() => handleImageClick(2)}
          />
          <ImageGridItem
            src="/gal4.jpg"
            alt="Image 4"
            className="col-span-2 row-start-3 row-end-4 rounded md:col-start-2 md:col-end-4 md:row-start-2 md:row-end-3"
            onClick={() => handleImageClick(3)}
          />
          <div className="row-start-4 row-end-5 flex gap-2 rounded bg-main-theme md:col-start-2 md:col-end-3 md:row-start-3 md:row-end-4">
            <ImageGridItem
              src="/gal5.jpg"
              alt="Image 5"
              className="h-full w-1/2 rounded"
              onClick={() => handleImageClick(4)}
            />
            <ImageGridItem
              src="/gal6.jpg"
              alt="Image 6"
              className="h-full w-1/2 rounded"
              onClick={() => handleImageClick(5)}
            />
          </div>
          <ImageGridItem
            src="/gal7.jpg"
            alt="Image 7"
            className="col-start-1 col-end-2 row-start-5 row-end-7 rounded md:col-start-2 md:col-end-3 md:row-start-4 md:row-end-5"
            onClick={() => handleImageClick(6)}
          />
          <ImageGridItem
            src="/gal8.jpg"
            alt="Image 8"
            className="col-start-1 col-end-3 row-start-1 row-end-3 rounded md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2"
            onClick={() => handleImageClick(7)}
          />
          <ImageGridItem
            src="/gal9.jpg"
            alt="Image 9"
            className="col-start-2 col-end-3 row-start-4 row-end-7 rounded md:col-start-3 md:col-end-4 md:row-start-3 md:row-end-5"
            onClick={() => handleImageClick(8)}
          />
        </div>
      </div>
      <div className="mx-auto mb-20 mt-10 flex flex-col items-center space-y-4 bg-secondary-theme bg-opacity-30 py-2 text-center text-lg md:text-xl lg:text-2xl xl:text-3xl">
        <h2>{t("gallery.cta.title")}</h2>
        <div className="flex space-x-4">
          <a
            href="https://www.instagram.com/your_page/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={"/instagram.svg"}
              alt="Link to our Instagram page"
              width={15}
              height={15}
            />
          </a>
          <a
            href="https://www.facebook.com/your_page/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={"/facebook.svg"}
              alt="Link to our Facebook page"
              width={15}
              height={15}
            />
          </a>
          <a
            href="https://www.tiktok.com/@your_page/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={"/tiktok.svg"}
              alt="Link to our TikTok page"
              width={15}
              height={15}
            />
          </a>
        </div>
      </div>
    </>
  );
};
