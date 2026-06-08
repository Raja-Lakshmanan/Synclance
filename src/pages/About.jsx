import '../styles/about.css'
import { RiTeamLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import ScrollRevealText from '../components/ScrollRevealText';
import { motion } from 'framer-motion';

const memberImages = import.meta.glob("../assets/members/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const members = [
  {
    name: "Nithish Kumar",
    role: "Poster Design & Logo Design",
    image: memberImages["../assets/members/Nithish.png"],
    description:
      "Creates clean, eye-catching poster designs with strong visuals, clear messaging, and a polished brand feel.",
  },
  {
    name: "Raja Lakshmanan",
    role: "Website Design & Development",
    image: memberImages["../assets/members/raja.png"],
    description:
      "Passionate about building modern web experiences with a focus on performance, creativity, and user-friendly design.",
  },
  {
    name: "Sarvesh",
    role: "Video Editing & UI/UX Design",
    image: memberImages["../assets/members/sarvesh.png"],
    description:
      "Combining creative video editing with intuitive UI/UX design to deliver visually engaging content and user-friendly digital experiences.",
  },
  {
    name: "Dharun",
    role: "Video Editing",
    image: memberImages["../assets/members/dharun.png"],
    description:
      "Focuses on sharp video edits, engaging cuts, and refined presentation for reels, project demos, and brand content.",
  },
  {
    name: "Abishek",
    role: "Design & Development",
    image: memberImages["../assets/members/abi.png"],
    description:
      "Combines design thinking and development skills to create practical, attractive, and reliable digital solutions.",
  },
  {
    name: "Harshath Roshan",
    role: "Video Editing & UI/UX Design",
    image: memberImages["../assets/members/roshan.png"],
    description:
      "Crafts polished video content with attention to rhythm, clarity, and a professional finish for modern platforms.",
  },
  {
    name: "Sasmitha",
    role: "PCB Design & Assignment Writing",
    image: memberImages["../assets/members/sas.png"],
    description:
      "Supports PCB design and academic writing with careful formatting, organized structure, and detail-focused execution.",
  },
  {
    name: "Radha Krishnan",
    role: "Poster Design & Logo Design",
    image: memberImages["../assets/members/radha.png"],
    description:
      "Creative poster and logo designs that capture attention, strengthen brand identity, and communicate ideas with a modern visual style.",
  },
  {
    name: "Niranjana",
    role: "Poster Design & Logo Design",
    image: memberImages["../assets/members/nir.png"],
    description:
      "Creating eye-catching posters and unique logos that enhance brand identity and communicate ideas with creativity and professionalism.",
  },
];

const googleFormLink = "https://forms.gle/F2semvxttVkhPqy58";

const aboutIntro =
  "At Luminotrix, our team is a blend of creative designers, skilled developers, and passionate engineers who come together to deliver powerful solutions. We work with dedication, innovation, and attention to detail to turn ideas into reality.";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const About = () => {
  return (
    <section className='about' id='about'>
      <motion.div
        className='first'
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2><RiTeamLine className='sicon'/> Our Members</h2>
        <div className='scrollpar'><ScrollRevealText text={aboutIntro} /></div>
      </motion.div>

      <div className="about-members-section">
        <motion.div
          className="members-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {members.map((member) => (
            <motion.article
              className="member-card"
              key={member.name}
              variants={fadeUp}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
            >
              <div className="member-image-wrap">
                <img className="member-image" src={member.image} alt={`Portrait of ${member.name}, ${member.role} at Luminotrix`} />
              </div>
              <div className="member-details">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <motion.div
                  className="member-description"
                  initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span>Description</span>
                  <p>{member.description}</p>
                </motion.div>
              </div>
            </motion.article>
          ))}

          <motion.article
            className="member-card apply-member-card"
            variants={fadeUp}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.015 }}
          >
            <div className="apply-plus" aria-hidden="true">
              <FiPlus />
            </div>
            <div className="member-details">
              <h3 className="member-name">To become a member</h3>
              <p className="member-role">Apply</p>
              <a
                className="apply-btn"
                href={googleFormLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apply to become a member of Luminotrix"
              >
                Apply
              </a>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}

export default About