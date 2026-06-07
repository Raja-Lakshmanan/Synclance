import { Typewriter } from 'react-simple-typewriter';
import './type.css'
const TypingText = () => {
  return (
    <>
      <span className='dev'>LUMINOTRIX :&nbsp;{' '}</span>
      <span className='dev'>
        <Typewriter
          words={['Creative Tech', 'Design Solutions', 'Innovative Ideas']}
          loop={0}
          cursor={true}
          cursorStyle='|'
          typeSpeed={60}
          deleteSpeed={30}
          delaySpeed={2000}
        />
      </span>
    </>
  );
};

export default TypingText;
