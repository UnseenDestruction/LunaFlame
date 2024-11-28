"use client"

import Image from "next/image";
import "./globals.css";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <div className="h-[100vh] w-[100vw] relative">
      <div className="absolute inset-0 bg-gradient-to-b top-[-800px] from-[#0D0D33] via-[#101052] to-black">
        <div className="absolute inset-0 flex items-center justify-center ">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className={`absolute rounded-full border border-[rgba(255,255,255,0.3)]`}
              style={{
                width: `${400 + index * 200}px`,
                height: `${400 + index * 200}px`,
              }}
            >
              
              </div>
          ))}
        </div>
      </div>

<div className="sun">
<Image 
              src="/luna.svg"
              alt="Luna"
              width={600}
              height={600}
              className="relative left-[29%] top-[-50px] animate-pulse z-50 "
            />

<div className="bg-black rounded-full w-[400px] h-[400px] absolute left-[515px] top-[-200px] "> 
</div>
</div>
          

      <div className="relative">
            <Image
              src="/4.png"
              alt="Moon"
              width={80}
              height={80}
              className="absolute left-[930px] bottom-[460px] opacity-50 moon1 rotate-[-19deg] animate-orbit1 "
            />
           <Image
          src="/2.png"
          alt="Moon"
          width={50}
          height={50}
          className="absolute  bottom-[450px] left-[345px] opacity-20 moon2 "
        />
           <Image
          src="/3.png"
          alt="Moon"
          width={100}
          height={100}
          className="absolute  bottom-[260px] left-[300px] opacity-20 moon3"
        />
           <Image
          src="/1.png"
          alt="Moon"
          width={80}
          height={80}
          className="absolute  bottom-[80px] left-[400px] opacity-60  transform rotate-[-10deg] moon4" 
        />
           <Image
          src="/moon2.png"
          alt="Moon"
          width={150}
          height={150}
          className="absolute bottom-[300px] left-[1150px] opacity-50 moon5"
        />
          
           <Image
          src="/big.png"
          alt="Moon"
          width={250}
          height={250}
          className="absolute bottom-[-83px] left-[700px] opacity-50 transform rotate-[2deg] moon6"
        />

      </div>
      </div>

      <div className="flex justify-center items-center flex-col h-[100vh] w-[100vw]">
        
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
}
