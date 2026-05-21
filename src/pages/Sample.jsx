import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiImage,
  FiLayers,
  FiMonitor,
  FiVideo,
  FiX,
} from "react-icons/fi";
import "../styles/sample.css";

// Update these import paths when the media filenames change.
// Future folder examples:
// import pidPhoto from "../assets/photo/pid/sample.jpg";
// import pidVideo from "../assets/video/pid/sample.mp4";
import pidPhoto from "../assets/photo/pid.jpeg";
import pidVideo from "../assets/video/pid.mp4";
import homeAutomationPhoto from "../assets/photo/homeautomation.jpeg";
import homeAutomationVideo from "../assets/video/homeautomation.mp4";
import poster1 from "../assets/poster/pos1.jpeg";
import poster2 from "../assets/poster/pos2.jpeg";
import reelsVideo from "../assets/edivideo/reels.mp4";

const websiteProjects = [
  {
    title: "Chatbot",
    url: "https://raja-lakshmanan.github.io/kriya_chatbot/",
    description: "AI chatbot website project with a clean UI and interactive features.",
  },
  {
    title: "Jai Sri Renuka Plywoods",
    url: "https://jaisrirenukaplywoods.com",
    description: "Business website for plywood products, gallery, contact, and branch details.",
  },
];

const projectSamples = [
  {
    title: "Line Follower Bot Using PID",
    category: "Project",
    photo: pidPhoto,
    video: pidVideo,
    description: "PID based project demo with practical implementation and tuned control behavior.",
  },
  {
    title: "Home Automation",
    category: "IoT Project",
    photo: homeAutomationPhoto,
    video: homeAutomationVideo,
    description: "Smart home automation system with device control and monitoring workflows.",
  },
];

const posterSamples = [
  {
    title: "Poster Sample 01",
    image: poster1,
  },
  {
    title: "Poster Sample 02",
    image: poster2,
  },
];

const editingSamples = [
  {
    title: "Reels Editing",
    category: "Video Editing",
    video: reelsVideo,
    description:
      "A creative reels editing sample with smooth cuts, transitions, and engaging visual flow.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const staggerGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const cardRise = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: "easeOut" },
  },
};

const posterSlide = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 72 : -72,
    scale: 0.985,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.42, ease: "easeOut" },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -72 : 72,
    scale: 0.985,
    transition: { duration: 0.32, ease: "easeIn" },
  }),
};

const MediaFallback = ({ label }) => (
  <div className="sample-media-fallback" role="status">
    <span>{label}</span>
    <strong>Media coming soon</strong>
  </div>
);

const PhotoPreview = ({ photo, title, onOpen }) => (
  <motion.button
    className="sample-media-frame sample-photo-frame sample-media-trigger"
    type="button"
    aria-label={`Open ${title} image preview`}
    disabled={!photo}
    onClick={() => onOpen({ type: "image", src: photo, title })}
    whileHover={{ y: -3 }}
  >
    {photo ? (
      <img src={photo} alt={`${title} project preview`} loading="lazy" />
    ) : (
      <MediaFallback label="Photo preview" />
    )}
  </motion.button>
);

const VideoPreview = ({ video, title, onOpen }) => (
  <motion.button
    className="sample-media-frame sample-video-frame sample-media-trigger"
    type="button"
    aria-label={`Open ${title} video preview`}
    disabled={!video}
    onClick={() => onOpen({ type: "video", src: video, title })}
    whileHover={{ y: -3 }}
  >
    {video ? (
      <video muted preload="metadata" playsInline aria-hidden="true">
        <source src={video} />
        Your browser does not support the video preview.
      </video>
    ) : (
      <MediaFallback label="Video preview" />
    )}
  </motion.button>
);

const MediaLightbox = ({ media, onClose }) => {
  const modalVideoRef = useRef(null);

  useEffect(() => {
    return () => {
      if (modalVideoRef.current) {
        modalVideoRef.current.pause();
        modalVideoRef.current.currentTime = 0;
      }
    };
  }, []);

  const closeLightbox = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }

    onClose();
  };

  return (
    <motion.div
      className="sample-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${media.title} ${media.type} preview`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      onClick={closeLightbox}
    >
      <button
        className="sample-lightbox-close"
        type="button"
        aria-label="Close media preview"
        onClick={closeLightbox}
      >
        <FiX />
      </button>

      <motion.div
        className="sample-lightbox-panel"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.97 }}
        transition={{ duration: 0.34, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        {media.type === "image" ? (
          <img src={media.src} alt={`${media.title} enlarged preview`} />
        ) : (
          <video ref={modalVideoRef} controls preload="metadata" playsInline>
            <source src={media.src} />
            Your browser does not support the video preview.
          </video>
        )}
      </motion.div>
    </motion.div>
  );
};

const Sample = () => {
  const [activeMedia, setActiveMedia] = useState(null);
  const [[activePoster, posterDirection], setPosterState] = useState([0, 1]);

  useEffect(() => {
    if (!activeMedia) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveMedia(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeMedia]);

  const changePoster = (step) => {
    setPosterState(([current]) => {
      const next = (current + step + posterSamples.length) % posterSamples.length;
      return [next, step];
    });
  };

  const handlePosterDragEnd = (_, info) => {
    if (info.offset.x <= -60) {
      changePoster(1);
    }

    if (info.offset.x >= 60) {
      changePoster(-1);
    }
  };

  return (
    <>
      <motion.section
        className="sample reveal-section"
        id="blog"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={fadeUp}
        transition={{ duration: 0.72, ease: "easeOut" }}
      >
        <div className="sample-shell">
        <motion.header
          className="sample-header"
          variants={fadeUp}
          transition={{ duration: 0.62, ease: "easeOut" }}
        >
          <p className="sample-kicker">Selected work</p>
          <motion.h2
            className="sample-title"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.72, delay: 0.08, ease: "easeOut" }}
          >
            Sample Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.62, delay: 0.16, ease: "easeOut" }}
          >
            Completed websites, engineering projects, poster-ready visuals, and edited video
            samples presented in one polished showcase.
          </motion.p>
        </motion.header>

        <section className="sample-block" aria-labelledby="sample-websites">
          <div className="sample-block-heading">
            <FiMonitor />
            <div>
              <h3 id="sample-websites">Websites</h3>
              <p>Live previews with direct access to each published website.</p>
            </div>
          </div>

          <motion.div
            className="website-grid"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.14 }}
          >
            {websiteProjects.map((website) => (
              <motion.article
                className="website-card"
                key={website.title}
                variants={cardRise}
                whileHover={{ y: -6 }}
              >
                <div className="website-browser">
                  <div className="website-browser-bar" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <iframe
                    src={website.url}
                    title={`${website.title} live website preview`}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>

                <div className="website-copy">
                  <h4>{website.title}</h4>
                  <p>{website.description}</p>
                  <p className="iframe-note">
                    If the preview is restricted by the website, open the live version below.
                  </p>
                  <a
                    className="sample-action"
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live Website
                    <FiExternalLink />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section className="sample-block" aria-labelledby="sample-projects">
          <div className="sample-block-heading">
            <FiLayers />
            <div>
              <h3 id="sample-projects">Projects</h3>
              <p>Matching photo and video media stay together inside each project card.</p>
            </div>
          </div>

          <motion.div
            className="project-sample-grid"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.14 }}
          >
            {projectSamples.map((project) => (
              <motion.article
                className="project-sample-card"
                key={project.title}
                variants={cardRise}
                whileHover={{ y: -7 }}
              >
                <div className="project-card-top">
                  <span>{project.category}</span>
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                </div>

                <div className="project-media-grid">
                  <div>
                    <small>Photo</small>
                    <PhotoPreview
                      photo={project.photo}
                      title={project.title}
                      onOpen={setActiveMedia}
                    />
                  </div>
                  <div>
                    <small>Video</small>
                    <VideoPreview
                      video={project.video}
                      title={project.title}
                      onOpen={setActiveMedia}
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <div className="sample-gallery-row">
          <section className="sample-block sample-gallery-block" aria-labelledby="sample-posters">
            <div className="sample-block-heading">
              <FiImage />
              <div>
                <h3 id="sample-posters">Posters</h3>
                <p>Visual samples for portfolio, poster, and project presentation work.</p>
              </div>
            </div>

            <motion.div
              className="poster-carousel"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.58, ease: "easeOut" }}
            >
              <button
                className="poster-arrow poster-arrow-left"
                type="button"
                aria-label="Show previous poster"
                onClick={() => changePoster(-1)}
              >
                <FiChevronLeft />
              </button>

              <div className="poster-stage">
                <AnimatePresence initial={false} custom={posterDirection} mode="wait">
                  <motion.div
                    className="poster-slide"
                    key={posterSamples[activePoster].title}
                    custom={posterDirection}
                    variants={posterSlide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={handlePosterDragEnd}
                  >
                    <div className="poster-frame">
                      <img
                        src={posterSamples[activePoster].image}
                        alt={posterSamples[activePoster].title}
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                className="poster-arrow poster-arrow-right"
                type="button"
                aria-label="Show next poster"
                onClick={() => changePoster(1)}
              >
                <FiChevronRight />
              </button>

              <div className="poster-dots" aria-label="Poster slide selection">
                {posterSamples.map((poster, index) => (
                  <button
                    className={index === activePoster ? "active" : ""}
                    key={poster.title}
                    type="button"
                    aria-label={`Show ${poster.title}`}
                    aria-pressed={index === activePoster}
                    onClick={() => setPosterState([index, index > activePoster ? 1 : -1])}
                  />
                ))}
              </div>
            </motion.div>
          </section>

          <section className="sample-block sample-gallery-block" aria-labelledby="sample-videos">
            <div className="sample-block-heading">
              <FiVideo />
              <div>
                <h3 id="sample-videos">Edited Videos</h3>
                <p>Responsive video previews with controls for focused sample viewing.</p>
              </div>
            </div>

            <div className="sample-strip-grid">
              {editingSamples.map((sample, index) => (
                <motion.article
                  className="sample-strip-card"
                  key={sample.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
                >
                  <VideoPreview
                    video={sample.video}
                    title={sample.title}
                    onOpen={setActiveMedia}
                  />
                  <div>
                    <span>{sample.category}</span>
                    <h4>{sample.title}</h4>
                    <p>{sample.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {activeMedia ? <MediaLightbox media={activeMedia} onClose={() => setActiveMedia(null)} /> : null}
      </AnimatePresence>
    </>
  );
};

export default Sample;
