"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    content: React.ReactNode;
  }[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 15;
  const SCALE_FACTOR = scaleFactor || 0.05;
  const [cards, setCards] = useState(items);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px 0px" });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isInView) {
      interval = setInterval(() => {
        setCards((prevCards: any) => {
          const newArray = [...prevCards];
          newArray.push(newArray.shift()!); // Move the first card to the back
          return newArray;
        });
      }, 2500); // 2.5s gives them time to read step 1 before slide 2
    }

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={containerRef} className="relative h-[320px] w-full max-w-[340px] mx-auto mt-16 mb-24">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-brinqo-red h-full w-full rounded-2xl p-6 border-[3px] border-brinqo-secondary-dark shadow-[4px_6px_0_#131313] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
            transition={{
                duration: 0.6,
                ease: "circOut"
            }}
          >
            <div className="flex justify-between items-start mb-4 border-b border-brinqo-secondary-dark/20 pb-4">
               <div>
                  <h3 className="font-headline text-4xl font-black text-brinqo-secondary-dark">
                    0{card.id + 1}/
                  </h3>
                  <p className="font-syne text-xl font-bold text-brinqo-secondary-dark pt-1">
                    {card.designation}
                  </p>
               </div>
            </div>
            
            <div className="font-arimo text-base text-brinqo-secondary-dark leading-snug flex-grow">
              {card.content}
            </div>

            <div className="mt-4 pt-4 border-t border-brinqo-secondary-dark/20 flex gap-2 w-full justify-between items-end">
              <span className="font-syne text-sm font-black text-brinqo-secondary-dark uppercase tracking-wide">
                {card.name}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
