import React from 'react';
import './Footer.css';
import { InstructionIconOne } from './InstructionIconOne';
import { InstructionIconTwo } from './InstructionIconTwo';
import { InstructionIconThree } from './InstructionIconThree';
import Heading from '../Heading/Heading';

const Footer = () => {
  const steps = [
    {
      icon: <InstructionIconOne />,
      title: 'DISCOVER',
      description: 'Discover the best properties matching your criteria.',
    },
    {
      icon: <InstructionIconTwo />,
      title: 'BID',
      description: 'Bid on your favorite properties - Save upto 44%.',
    },
    {
      icon: <InstructionIconThree />,
      title: 'ENJOY',
      description: 'Secure a sweet deal and enjoy a great stay.',
    },
    // {
    //   icon: <InstructionIconFour />,
    //   title: 'Confirm and Enjoy',
    //   description:
    //     'Once your bid is accepted, confirm your stay and start preparing for your trip.',
    // },
  ];

  return (
    <div className="steps-wrapper">
      <Heading
        content="Your Guide to Book the Perfect Stay!"
        style={{ fontSize: '25px', marginBottom: '20px' }}
      />
      <div className="container container-steps">
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step" key={index}>
              <div
                style={{
                  height: '45px',
                  width: '45px',
                  marginBottom: '40px',
                }}
              >
                {step.icon}
              </div>
              <h2
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#4dcad2',
                }}
              >
                {step.title}
              </h2>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
