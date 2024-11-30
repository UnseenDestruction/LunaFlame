"use client"

import React from "react";
import Image from "next/image";

const Home = () => {
  return (
    <main className="bg-black">
      <div className="w-[100vw] h-[120vh] md:w-[100vw] md:h-[120vh] overflow-hidden mb-0">
      <div className="absolute inset-0 bg-gradient-to-b  from-[#0D0D33] via-[#101052] to-black"/>
    

      <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-10"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${Math.random() * 5 + 5}s infinite`,
              }}
            ></div>
          ))}
        </div>
      <div className="absolute  z-50 md:top-[10px] md:left-[0px]">
        <Image 
                      src="/luna.svg"
                      alt="Luna"
                      width={600}
                      height={600}
                      className="relative md:left-[73%] md:top-[-60px] top-[-30px] left-[20px] animate-pulse z-50 "
                    />

        <div className="bg-black rounded-full md:w-[500px] md:h-[500px] w-[250px] h-[250px] absolute top-[-140px] left-[80px] md:left-[490px] md:top-[-300px] shadow-[0_0_200px_60px_rgba(255,0,0,0.2)] "> 
        </div>
        </div>
      <div className="relative md:top-[-750px] top-[-450px] md:h-[220vh] h-[150vh]  right-[250px] md:right-[50px] z-50 w-[220vw] md:w-[100vw] ">
    <ol >
  <li className="sun hidden md:visible"></li>
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
<div className="flex justify-start md:justify-center items-center flex-col h-[50vh] md:h-[100vh] relative top-[-100px] md:top-[0px] w-[100vw] ">
{Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${Math.random() * 5 + 5}s infinite`,
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
                     <a href="mailto:your-email@example.com">
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
          onClick={() => window.location.href = 'mailto:your-email@example.com'}
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
