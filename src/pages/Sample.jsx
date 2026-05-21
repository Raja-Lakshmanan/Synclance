import { motion } from "framer-motion";
import { FiExternalLink, FiImage, FiLayers, FiMonitor, FiVideo } from "react-icons/fi";
import "../styles/sample.css";

// Update these import paths when the media filenames change.
// Future folder examples:
// import pidPhoto from "../assets/photo/pid/sample.jpg";
// import pidVideo from "../assets/video/pid/sample.mp4";
import pidPhoto from "../assets/photo/pid.jpeg";
import pidVideo from "../assets/video/pid.mp4";
import homeAutomationPhoto from "../assets/photo/homeautomation.jpeg";
import homeAutomationVideo from "../assets/video/homeautomation.mp4";

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

const MediaFallback = ({ label }) => (
  <div className="sample-media-fallback" role="status">
    <span>{label}</span>
    <strong>Media coming soon</strong>
  </div>
);

const PhotoPreview = ({ photo, title }) => (
  <div className="sample-media-frame sample-photo-frame">
    {photo ? (
      <img src={photo} alt={`${title} project preview`} loading="lazy" />
    ) : (
      <MediaFallback label="Photo preview" />
    )}
  </div>
);

const VideoPreview = ({ video, title }) => (
  <div className="sample-media-frame sample-video-frame">
    {video ? (
      <video controls preload="metadata" playsInline aria-label={`${title} video preview`}>
        <source src={video} />
        Your browser does not support the video preview.
      </video>
    ) : (
      <MediaFallback label="Video preview" />
    )}
  </div>
);

const Sample = () => {
  return (
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
                    <PhotoPreview photo={project.photo} title={project.title} />
                  </div>
                  <div>
                    <small>Video</small>
                    <VideoPreview video={project.video} title={project.title} />
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
                <h3 id="sample-posters">Posters / Photos</h3>
                <p>Visual samples for portfolio, poster, and project presentation work.</p>
              </div>
            </div>

            <div className="sample-strip-grid">
              {projectSamples.map((project, index) => (
                <motion.article
                  className="sample-strip-card"
                  key={`${project.title}-photo`}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
                >
                  <PhotoPreview photo={project.photo} title={project.title} />
                  <div>
                    <span>{project.category}</span>
                    <h4>{project.title}</h4>
                  </div>
                </motion.article>
              ))}
            </div>
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
              {projectSamples.map((project, index) => (
                <motion.article
                  className="sample-strip-card"
                  key={`${project.title}-video`}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
                >
                  <VideoPreview video={project.video} title={project.title} />
                  <div>
                    <span>{project.category}</span>
                    <h4>{project.title}</h4>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.section>
  );
};

export default Sample;
