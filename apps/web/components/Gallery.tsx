import React, { useState, MouseEventHandler } from "react";
import Image from "next/image";

export const GalleryIntro = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <iframe
        className="top-50 left-50 -translate-x-50% -translate-y-50% absolute hidden h-auto min-h-full w-auto min-w-full transform lg:block"
        src="https://www.youtube.com/embed/pY2CWYxUbrM?start=60&autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=pY2CWYxUbrM"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="absolute inset-0 bg-[url('/gallerysmallscreen.webp')] bg-cover bg-center lg:hidden "></div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 text-center">
        <div>
          <h1 className="mb-4 text-3xl text-white lg:text-5xl">
            Fedezze fel eleganciánkat képekben
          </h1>
        </div>
      </div>
    </div>
  );
};

type ImageGridItemProps = {
  src: string;
  alt: string;
  onClick: MouseEventHandler;
  className?: string;
};

const ImageGridItem: React.FC<ImageGridItemProps> = ({
  src,
  alt,
  onClick,
  className,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleImageClick = (image) => {
    setModalImage(image);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="relative flex w-full justify-center">
        {isModalOpen && (
          <div
            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
            onClick={handleImageClick}
          >
            <div className="absolute inset-4 scale-100 transform lg:inset-16">
              <Image
                src={modalImage}
                alt="image"
                fill
                style={{ objectFit: "contain" }}
                className="rounded"
                onClick={handleImageClick}
              />
            </div>
          </div>
        )}
        <div className="my-10 grid h-screen w-full grid-cols-2 grid-rows-6 gap-4 p-4 md:w-11/12 md:grid-cols-3 md:grid-rows-4 md:p-10">
          <ImageGridItem
            onClick={() => handleImageClick("/gallery1.webp")}
            src="/gallery1.webp"
            alt="Image 1"
            className="col-span-2 row-span-6 rounded md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-4"
          />
          <ImageGridItem
            onClick={() => handleImageClick("/gallery2.webp")}
            src="/gallery2.webp"
            alt="Image 2"
            className="col-start-1 col-end-2 rounded md:col-start-1 md:col-end-2 md:row-start-4 md:row-end-5"
          />
          <ImageGridItem
            onClick={() => handleImageClick("/gallery1.webp")}
            src="/gallery1.webp"
            alt="Image 3"
            className="col-start-2 col-end-3 row-span-1 rounded md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2"
          />
          <ImageGridItem
            onClick={() => handleImageClick("/gallery2.webp")}
            src="/gallery2.webp"
            alt="Image 4"
            className="col-span-2 row-start-3 row-end-4 rounded md:col-start-2 md:col-end-4 md:row-start-2 md:row-end-3"
          />
          <div className="row-start-4 row-end-5 flex gap-2 rounded bg-main-theme md:col-start-2 md:col-end-3 md:row-start-3 md:row-end-4">
            <ImageGridItem
              onClick={() => handleImageClick("/gallery1.webp")}
              src="/gallery1.webp"
              alt="Image 5"
              className="h-full w-1/2 rounded"
            />
            <ImageGridItem
              onClick={() => handleImageClick("/gallery2.webp")}
              src="/gallery2.webp"
              alt="Image 6"
              className="h-full w-1/2 rounded"
            />
          </div>
          <ImageGridItem
            onClick={() => handleImageClick("/gallery1.webp")}
            src="/gallery1.webp"
            alt="Image 7"
            className="col-start-1 col-end-2 row-start-5 row-end-7 rounded md:col-start-2 md:col-end-3 md:row-start-4 md:row-end-5"
          />
          <ImageGridItem
            onClick={() => handleImageClick("/gallery2.webp")}
            src="/gallery2.webp"
            alt="Image 8"
            className="col-start-1 col-end-3 row-start-1 row-end-3 rounded md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2"
          />
          <ImageGridItem
            onClick={() => handleImageClick("/gallery1.webp")}
            src="/gallery1.webp"
            alt="Image 9"
            className="col-start-2 col-end-3 row-start-4 row-end-7 rounded md:col-start-3 md:col-end-4 md:row-start-3 md:row-end-5"
          />
        </div>
      </div>
      <div className="mx-auto mb-20 mt-10 flex flex-col items-center space-y-4 bg-secondary-theme bg-opacity-30 py-2 text-center text-lg md:text-xl lg:text-2xl xl:text-3xl">
        <h2>
          Kövessen minket a közösségi média platformjainkon, hogy naprakész
          legyen legújabb tartalmainkkal kapcsolatban!
        </h2>
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
