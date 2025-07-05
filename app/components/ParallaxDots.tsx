import React, { useEffect, useRef } from 'react';

const PolkaDotBackground = () => {
  const dotsContainerRef = useRef<HTMLDivElement>(null);


  const parallaxSpeedRatio = 0.2;

  useEffect(() => {
    const container = dotsContainerRef.current;
    if (!container) {
      return;
    }

    const handleScroll = () => {
      const yOffset = -window.scrollY * parallaxSpeedRatio;
      container.style.transform = `translateY(${yOffset}px)`;
    };


    window.addEventListener('scroll', handleScroll);


    handleScroll();
    console.log("Initial scroll position set");


    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderDots = () => {
    const dots = [];

    const columns = 5;
    const rows = 25;
    const totalDots = columns * rows;

    for (let i = 0; i < totalDots; i++) {
      const colPos = (i % columns) + 1;
      const rowPos = Math.floor(i / columns) + 1;

      const size = `${8 + (i % 4) * 0.8}vmin`;

      let opacity = 0.1 + (i % 5) * 0.03;

      dots.push(
        <div
          key={`dot-${i}`}
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: `rgba(50, 50, 50, ${opacity})`,
            margin: 'auto',
            gridColumn: colPos,
            gridRow: rowPos
          }}
        />
      );
    }

    return dots;
  };

  const dots = renderDots();

  return (
    <div className="fixed inset-0 w-full h-full z-[0] overflow-hidden pointer-events-none mt-[200px]">
      <div
        ref={dotsContainerRef}
        className="absolute inset-0 w-full h-full"
      >
        <div
          className="w-full h-[200vh] grid"
          style={{
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(25, 1fr)',
            gap: '8vmin',
            padding: '5vmin'
          }}
        >
          {dots}
        </div>
      </div>
    </div>
  );
};

export default PolkaDotBackground;
