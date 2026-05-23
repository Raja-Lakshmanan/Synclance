import '../styles/about.css'
import { RiTeamLine } from "react-icons/ri";
import { FiMail, FiPhone, FiPlus } from "react-icons/fi";
import ScrollRevealText from '../components/ScrollRevealText';
import { motion } from 'framer-motion';

const memberImages = import.meta.glob("../assets/members/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const enquirySubject = "Project Enquiry";
const enquiryBody =
  "Hello, I am interested in your service. Please contact me.";
const createMailLink = (email) =>
  `mailto:${email}?subject=${encodeURIComponent(enquirySubject)}&body=${encodeURIComponent(enquiryBody)}`;

const members = [
  {
    name: "Nithish Kumar",
    role: "Poster Design",
    phone: "+917639077992",
    email: "nithish@example.com",
    image: memberImages["../assets/members/Nithish.png"],
  },
  {
    name: "Raja Lakshmanan",
    role: "Website Development",
    phone: "+917639077992",
    email: "rajalakshmanan807@gmail.com",
    image: memberImages["../assets/members/raja.png"],
  },
  {
    name: "Sarvesh",
    role: "Video Editing",
    phone: "+917639077992",
    email: "sarvesh@example.com",
    image: memberImages["../assets/members/sarvesh.png"],
  },
  {
    name: "Dharun",
    role: "Video Editing",
    phone: "+919342253612",
    email: "mdharun8105@gmail.com",
    image: memberImages["../assets/members/dharun.png"],
  },
  {
    name: "Abishek",
    role: "Design & Development",
    phone: "+919080253991",
    email: "gabishekkumar2007@gmail.com",
    image: memberImages["../assets/members/abi.png"],
  },
  {
    name: "Harshath Roshan",
    role: "Video Editing",
    phone: "+917639077992",
    email: "Roshan@example.com",
    image: memberImages["../assets/members/roshan.png"],
  },
  {
    name: "Sasmitha",
    role: "PCB Design & Assignment Writing",
    phone: "+918190018720",
    email: "sasmithaprakash1984@gmail.com",
    image: memberImages["../assets/members/sas.png"],
  },
  {
    name: "Radha Krishnan",
    role: "PCB Design & Assignment Writing",
    phone: "+918190018720",
    email: "sasmithaprakash1984@gmail.com",
    image: memberImages["../assets/members/radha.png"],
  },
  {
    name: "Niranjana",
    role: "PCB Design & Assignment Writing",
    phone: "+918190018720",
    email: "sasmithaprakash1984@gmail.com",
    image: memberImages["../assets/members/nir.png"],
  },
];

const googleFormLink = "https://forms.gle/F2semvxttVkhPqy58";

const aboutIntro =
  "At Synclance, our team is a blend of creative designers, skilled developers, and passionate engineers who come together to deliver powerful solutions. We work with dedication, innovation, and attention to detail to turn ideas into reality.";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const About = () => {
  return (
    <section className='about' id='about'>
      <motion.div
        className='first'
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
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
          viewport={{ once: true, amount: 0.2 }}
        >
          {members.map((member) => (
            <motion.article
              className="member-card"
              key={member.name}
              variants={fadeUp}
              transition={{ duration: 0.62, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <div className="member-image-wrap">
                <img className="member-image" src={member.image} alt={member.name} />
              </div>
              <div className="member-details">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <div className="member-contact">
                  <a className="member-link" href={`tel:${member.phone}`} aria-label={`Call ${member.name}`}>
                    <FiPhone />
                    <span>{member.phone}</span>
                  </a>
                  <a className="member-link" href={createMailLink(member.email)} aria-label={`Email ${member.name}`}>
                    <FiMail />
                    <span>{member.email}</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}

          <motion.article
            className="member-card apply-member-card"
            variants={fadeUp}
            transition={{ duration: 0.62, ease: "easeOut" }}
            whileHover={{ y: -6, scale: 1.01 }}
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
