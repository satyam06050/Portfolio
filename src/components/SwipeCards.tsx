"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import ImageWithSkeleton from "./ImageWithSkeleton";

interface SwipeCardsProps {
  className?: string;
}

const SwipeCards = ({ className }: SwipeCardsProps) => {
  const [cards, setCards] = useState<Card[]>(cardData);

  const resetCards = () => {
    setCards(cardData);
  };

  return (
    <div
      className={cn(
         "relative grid h-[220px] w-[220px] place-items-center -translate-y-12",
        className
      )}
    >
      {cards.length === 0 && (
        <div style={{ gridRow: 1, gridColumn: 1 }} className="z-20">
          <Button onClick={resetCards} variant="outline">
            <RefreshCw className="size-4" />
            Again
          </Button>
        </div>
      )}

      {cards.map((card, index) => {
        const depth = cards.length - 1 - index;

        return (
          <Card
            key={card.id}
            cards={cards}
            setCards={setCards}
            depth={depth}
            {...card}
          />
        );
      })}
    </div>
  );
};

const Card = ({
  id,
  url,
  setCards,
  cards,
  depth,
}: {
  id: number;
  url: string;
  setCards: Dispatch<SetStateAction<Card[]>>;
  cards: Card[];
  depth: number;
}) => {
  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);

  const isFront = id === cards[cards.length - 1]?.id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 5 : -5;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = (
    event: any,
    info: { offset: { x: number } }
  ) => {
    if (Math.abs(info.offset.x) > 90) {
      setCards((pv) => pv.filter((v) => v.id !== id));
    } else {
      animate(x, 0, {
        type: "spring",
        stiffness: 450,
        damping: 35,
      });
    }
  };

  return (
    <motion.div
      className="absolute h-[220px] w-[220px] overflow-hidden rounded-full bg-white hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        boxShadow: isFront
          ? "0 18px 35px rgba(0,0,0,.22)"
          : "0 8px 18px rgba(0,0,0,.12)",
      }}
      animate={{
        scale: isFront ? 1 : Math.max(0.88, 0.95 - depth * 0.03),
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{
        left: -130,
        right: 130,
        top: 0,
        bottom: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      {isFront ? (
        <ImageWithSkeleton
          src={url}
          alt="Profile"
          width={220}
          height={220}
          sizes="220px"
          quality={85}
          draggable={false}
          containerClassName="h-full w-full pointer-events-none"
          className="h-full w-full object-cover select-none"
          fetchPriority="high"
          priority
        />
      ) : (
        <ImageWithSkeleton
          src={url}
          alt=""
          width={220}
          height={220}
          sizes="220px"
          quality={75}
          draggable={false}
          containerClassName="h-full w-full pointer-events-none"
          className="h-full w-full object-cover select-none"
          fetchPriority="low"
          loading="lazy"
        />
      )}
    </motion.div>
  );
};

export default SwipeCards;

type Card = {
  id: number;
  url: string;
};

const cardData: Card[] = [
  {
    id: 1,
    url: "/img/satyam_1.jpg",
  },
  {
    id: 2,
    url: "/img/satyam_1.jpg",
  },
  {
    id: 3,
    url: "/img/satyam_1.jpg",
  },
  {
    id: 4,
    url: "/img/satyam_2.jpg",
  },
];