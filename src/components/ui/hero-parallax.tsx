"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

import { useTranslations } from 'next-intl';
import Image from "next/image";
import { cn } from "@/lib/utils";

export const HeroParallax = ({
  products,
  isLowPowerMode,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  isLowPowerMode?: boolean;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Spring smooths ONLY the rotation to prevent aliasing jitter ("shaking")
  const rotateSpringConfig = { stiffness: 200, damping: 20 };

  const translateX = useTransform(scrollYProgress, [0, 1], [0, isLowPowerMode ? 200 : 800]);
  const translateXReverse = useTransform(scrollYProgress, [0, 1], [0, isLowPowerMode ? -200 : -800]);

  const rotateXRaw = useTransform(scrollYProgress, [0, 0.2], [isLowPowerMode ? 0 : 5, 0]);
  const rotateX = useSpring(rotateXRaw, rotateSpringConfig);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [isLowPowerMode ? 0.8 : 0.2, 1]);

  const rotateZRaw = useTransform(scrollYProgress, [0, 0.2], [isLowPowerMode ? 0 : 5, 0]);
  const rotateZ = useSpring(rotateZRaw, rotateSpringConfig);
  const translateY = useTransform(scrollYProgress, [0, 0.2], [isLowPowerMode ? 20 : 100, isLowPowerMode ? 100 : 500]);
  return (
    <div
      ref={ref}
      className={cn(
        "pt-4 pb-12 sm:pb-24 overflow-hidden antialiased relative flex flex-col self-auto",
        isLowPowerMode
          ? "h-auto min-h-[80vh] sm:min-h-[100vh]"
          : "h-[180vh] sm:h-[200vh] lg:h-[250vh] [perspective:2000px] [transform-style:preserve-3d]"
      )}
    >
      <Header />
      <motion.div
        style={{
          translateY: isLowPowerMode ? 0 : translateY,
          opacity,
          backfaceVisibility: 'hidden',
        }}
        className="mt-6 md:mt-12"
      >
        <motion.div className={cn("flex flex-row-reverse space-x-reverse space-x-6 sm:space-x-20 mb-8 sm:mb-20 overflow-x-auto no-scrollbar px-4 sm:px-0", isLowPowerMode && "mb-6 space-x-6")}>
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              isLowPowerMode={isLowPowerMode}
            />
          ))}
        </motion.div>
        <motion.div className={cn("flex flex-row mb-8 sm:mb-20 space-x-6 sm:space-x-20 overflow-x-auto no-scrollbar px-4 sm:px-0", isLowPowerMode && "mb-6 space-x-6")}>
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
              isLowPowerMode={isLowPowerMode}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const t = useTranslations('projectHeader');
  return (
    <div className="max-w-7xl relative mx-auto pt-28 sm:pt-36 md:pt-44 px-4 w-full left-0 top-0 z-20">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold dark:text-white tracking-tight">
        {t('title')}
      </h1>
      <p
        className="max-w-2xl text-sm sm:text-base md:text-xl mt-4 sm:mt-6 text-muted-foreground dark:text-neutral-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: t.raw('subtitle') }}
      />

      {/* Scroll Indicator - Positioned in normal flow below text */}
      <motion.div
        className="flex items-center gap-3 mt-6 sm:mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="w-[1px] h-6 sm:h-10 bg-gradient-to-b from-transparent via-neutral-400 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 w-full h-1/2 bg-white blur-[1px]"
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono font-semibold">
          Scroll Archive
        </span>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  isLowPowerMode,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
  isLowPowerMode?: boolean;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={isLowPowerMode ? {} : {
        y: -20,
      }}
      key={product.title}
      className={cn(
        "group/product relative shrink-0",
        isLowPowerMode ? "h-48 w-[12rem] md:h-64 md:w-[20rem]" : "h-64 w-[16rem] md:h-96 md:w-[30rem]"
      )}
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
