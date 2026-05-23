import { Typewriter } from 'react-simple-typewriter';
import './type.css'
const TypingText = () => {
  return (
    <div className='type'>
      <h1 className='dev'>SYNCLANCE :&nbsp;{' '}</h1>
      <h1 className='dev'>
        <Typewriter
          words={['Creative Tech', 'Design Solutions', 'Innovative Ideas']}
          loop={0}
          cursor={true}
          cursorStyle=''
          typeSpeed={30}
          deleteSpeed={10}
          delaySpeed={1000}
        />
      </h1>
    </div>
  );
};

export default TypingText;
