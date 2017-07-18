import React from 'react';

const CountDown = (props) => {
  return (
    <div className='countdown'>
    <h1>{props.minutes}:{props.seconds}</h1>
    </div>
  );
};

export default CountDown;
