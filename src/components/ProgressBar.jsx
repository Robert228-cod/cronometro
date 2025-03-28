import React, { useState, useEffect } from 'react';

export const ProgressBar = ({ time = 1000, color = "blue"}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const increment = 100/(time/100)

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + increment
        if (newProgress === 100) {
          clearInterval(interval) 
          return 100
        }
        return newProgress
      });
    }, 100)

    return () => {
        clearInterval(interval)
    }
  }, [time])

  return (
    <div className='contentBar' style={{ width: '300px', height: '3px', backgroundColor: 'black', borderRadius: '5px' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: `${color}`,
          borderRadius: '5px',
        }}
      >
      </div>
    </div>
  );
};
