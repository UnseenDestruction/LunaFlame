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
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email.trim()) {
      alert("Please enter a valid email address.");
      return;
    }
    alert(`Thank you for joining the waitlist, ${email}!`);
    setEmail(""); 
    setShowInput(false); 
  };

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
    <main className="">
      <div className="w-[100vw]  h-[60vh] sm:h-[80vh]  md:h-[100vh] xl:h-[120vh] bg-black   md:w-[100vw] overflow-hidden  ">
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
      <div className="flex justify-center items-center overflow-hidden z-50  left-[-10px] ssm:left-[100px]  sm:left-[150px] shadow-[0_0_200px_60px_rgba(255,0,0,0.2)]">
        <Image 
                      src="/darkLogo.png"
                      alt="Luna"
                      width={600}
                      height={600}
                      className="relative left-[15px] top-[-23px]  w-[150px] xl:w-[420px] xl:left-[30px]  xl:h-[250px] h-[100px] sm:h-[130px] sm:w-[230px] animate-pulse z-50  d:h-[200px] md:w-[280px]"
                    />

        </div>
      <div className="flex flex-col justify-start items-start relative top-[-290px] right-[5px] xxs:top-[-320px] xs:top-[-320px] ssmm:top-[-370px] ssm:top-[-400px] sssmm:top-[-450px] sssmm:right-[15px] sssm:top-[-360px] mmd:top-[-680px] md:top-[-590px] lg:top-[-750px] lg:right-[40px] xl:top-[-1000px]  sm:top-[-480px] sm:right-[20px] h-[100vh] ">
    <ol >
  <li className="earth"></li>
  <li className="mars"></li>
  <li className="jupiter"></li>
  <li className="saturn"></li>
  <li className="uranus"></li>
  <li className="venus"></li>
  <li className="pluto"></li>
</ol>
</div>
</div>
<div className="bg-black flex justify-center ter items-center flex-col h-[70vh] overflow-hidden   ">
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
        className="z-50"
        />
        
                  <div>
        
                <div className="flex justify-center items-center mt-10 gap-[18px]">
                               <div className="bg-[#FC0160] h-[12px] w-[12px] rounded-full" />
                            <div 
                            className="bg-[#FC0160] h-[20px] w-[20px] rounded-full" />

  
  {showInput && (
              <input
                type="email"
                placeholder="Type your Email Here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                className="
                  bg-[#FC0160] 
                  rounded-xl
                   placeholder-[#000]
                  p-3
                  px-3
                  lg:px-8
                  items-center 
                  font-bold
                  text-xs
                  lg:text-lg
                  
                "
              />
            )}
            <button
            onClick={() => (showInput ? handleSubmit() : setShowInput(true))}
              className="
                bg-[#FC0160] 
                rounded-full 
                p-3
                px-3
                lg:px-8
                flex 
                items-center 
                shadblack
                font-bold
                text-xs
                lg:text-lg
              "
            >
                {showInput ? "Submit" : "Join Waitlist"}
            </button>
                        <div  className="bg-[#FC0160] h-[20px] w-[20px] rounded-full" />
        
                        <div  className="bg-[#FC0160] h-[12px] w-[12px] rounded-full" />
        
                        </div>
        
                </div>
        </div>
</main>
  );
};

export default Home;
