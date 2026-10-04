import { useEffect, useState } from "react";

export default function ProjectGallery({ images = [], title }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const imageCount = images.length;
  const hasMultipleImages = imageCount > 1;
  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft" && hasMultipleImages) {
        setActiveIndex((currentIndex) =>
          currentIndex === 0 ? imageCount - 1 : currentIndex - 1
        );
      }

      if (event.key === "ArrowRight" && hasMultipleImages) {
        setActiveIndex((currentIndex) =>
          currentIndex === imageCount - 1 ? 0 : currentIndex + 1
        );
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, hasMultipleImages, imageCount]);

  if (imageCount === 0) return null;

  function showPreviousImage() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? imageCount - 1 : currentIndex - 1
    );
  }

  function showNextImage() {
    setActiveIndex((currentIndex) =>
      currentIndex === imageCount - 1 ? 0 : currentIndex + 1
    );
  }

  return (
    <section className="space-y-4">
      <button
        type="button"
        onClick={() => setActiveIndex(0)}
        className="block w-full overflow-hidden rounded-lg border border-gray-800 bg-gray-900 text-left transition hover:border-emerald-400/50"
      >
        <img
          src={images[0]}
          alt={`${title} screenshot 1`}
          className="aspect-video w-full object-contain"
        />
      </button>

      {hasMultipleImages && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.slice(1).map((image, index) => {
            const imageIndex = index + 1;

            return (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(imageIndex)}
                className="overflow-hidden rounded-md border border-gray-800 bg-gray-900 transition hover:border-emerald-400/50"
              >
                <img
                  src={image}
                  alt={`${title} screenshot ${imageIndex + 1}`}
                  className="aspect-video w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/95 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 rounded-full border border-gray-700 bg-gray-900/80 px-3 py-1.5 font-mono text-sm text-gray-300 transition hover:border-emerald-400 hover:text-white"
            aria-label="Close image preview"
          >
            close
          </button>

          {hasMultipleImages && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-gray-700 bg-gray-900/80 px-3 py-2 text-2xl leading-none text-gray-300 transition hover:border-emerald-400 hover:text-white"
              aria-label="Previous image"
            >
              &lsaquo;
            </button>
          )}

          <img
            src={activeImage}
            alt={`${title} screenshot ${activeIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />

          {hasMultipleImages && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-gray-700 bg-gray-900/80 px-3 py-2 text-2xl leading-none text-gray-300 transition hover:border-emerald-400 hover:text-white"
              aria-label="Next image"
            >
              &rsaquo;
            </button>
          )}
        </div>
      )}
    </section>
  );
}
