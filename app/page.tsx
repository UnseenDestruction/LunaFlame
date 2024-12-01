"use client"

import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";


type Star = {
  width: string;
  height: string;
  top: string;
  left: string;
  opacity: number;
  animationDuration: string;
};

const Home = () => {

  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () =>
      Array.from({ length: 100 }).map(() => ({
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.3,
        animationDuration: `${Math.random() * 5 + 5}s`,
      }));
    setStars(generateStars());
  }, []);

  return (
    <main className="bg-black">
      <div className="w-[100vw] h-[120vh] lg:w-[100vw] lg:h-[120vh] overflow-hidden mb-[100px] xxs:mb-[0px] lg:mb-[0px] ">
      <div className="absolute inset-0 bg-gradient-to-b  from-[#0D0D33] via-[#101052] to-black"/>
      <div className="absolute inset-0 pointer-events-none">
      {stars.map((star, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-10"
              style={{
                width: star.width,
                height: star.height,
                top: star.top,
                left: star.left,
                opacity: star.opacity,
                animation: `twinkle ${star.animationDuration} infinite`,
              }}
            ></div>
          ))}
        </div>
      <div className="absolute  z-50 lg:top-[10px] lg:left-[0px] left-[-10px] xxs:left-[20px] xs:left-[50px] ssm:left-[100px] md:left-[300px] sm:left-[150px] ">
        <Image 
                      src="/luna.svg"
                      alt="Luna"
                      width={600}
                      height={600}
                      className="relative lg:left-[73%] lg:top-[-60px] top-[-55px] left-[30px] animate-pulse z-50 w-[350px] h-[400px] lg:w-[600px] lg:h-[600px] sssm:w-[400px] sssm:h-[400px] ssm:w-[400px] sm:h-[400px] sm:top-[-35px] sm:w-[400px] ssm:h-[400px] sssm:top-[-35px] ssm:top-[-35px]"
                    />

        <div className="bg-black rounded-full lg:w-[500px] lg:h-[500px] w-[250px] h-[250px] xs:h-[300px] xs:w-[300px] sssm:h-[300px] sssm:w-[300px] ssm:top-[-170px] ssm:h-[300px] ssm:w-[300px] sm:h-[300px] sm:w-[300px] sm:top-[-170px] sssm:top-[-170px] xs:top-[-170px] xs:left-[60px] absolute top-[-140px] md:top-[-120px] md:h-[250px] md:w-[250px] md:left-[100px] left-[80px] lg:left-[490px] lg:top-[-300px] shadow-[0_0_200px_60px_rgba(255,0,0,0.2)] " /> 
        
        </div>
      <div className="relative lg:top-[-750px] top-[-480px] lg:h-[220vh] h-[150vh]  right-[260px] lg:left-[-50px] z-50 w-[220vw] md:w-[100vw] lg:w-[100vw] xs:top-[-550px] xs:right-[260px] sssm:right-[360px] sssm:top-[-580px] ssm:right-[400px] ssm:top-[-780px] xxs:top-[-500px] xxs:right-[260px]   sm:top-[-1000px] sm:right-[550px] md:top-[-500px] md:left-[0px] ">
    <ol >
  <li className="sun hidden lg:visible"></li>
  <li className="earth"></li>
  <li className="mars"></li>
  <li className="jupiter"></li>
  <li className="saturn"></li>
  <li className="uranus"></li>
  <li className="venus
  
  "></li>
  <li className="pluto"></li>
</ol>
</div>
</div>
<div className="flex justify-start lg:justify-center items-center flex-col h-[50vh] lg:h-[100vh] relative top-[-100px] lg:top-[0px] w-[100vw] ">
{stars.map((star, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-10"
              style={{
                width: star.width,
                height: star.height,
                top: star.top,
                left: star.left,
                opacity: star.opacity,
                animation: `twinkle ${star.animationDuration} infinite`,
              }}
            ></div>
          ))}

        <Image 
        src='/typo.png'
        alt="type"
        width={1200}
        height={1200}
        />
        
                  <div>
        
                <div className="flex justify-center items-center gap-[18px]">
                               <div className="bg-[#FC0160] h-[12px] w-[12px] rounded-full" />
                            <div 
                            
                            className="bg-[#FC0160] h-[20px] w-[20px] rounded-full" />
                <a href="mailto:unseenworkmail@gmail.com?subject=Join%20Waitlist&body=I%20want%20to%20join 🥺">
  <button
    className="
      bg-[#FC0160] 
      rounded-full 
      p-3
      px-8
      flex 
      items-center 
      shadow-lg
      text-black
      font-bold
    "
  >
    Join Waitlist
  </button>
</a>

        
                        <div  className="bg-[#FC0160] h-[20px] w-[20px] rounded-full" />
        
                        <div  className="bg-[#FC0160] h-[12px] w-[12px] rounded-full" />
        
                        </div>
        
                </div>
        </div>
</main>
  );
};

export default Home;
