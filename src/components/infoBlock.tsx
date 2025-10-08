import Image from "next/image";
import { StaggeredAnimation, StaggeredItem } from "./animations/SectionAnimation";
import { motion } from "framer-motion";

export default function infoBlock() {
  return (
    <StaggeredAnimation className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 lg:gap-20 my-10 lg:my-20 px-4">
      <StaggeredItem>
        <motion.div 
          className="flex flex-col items-center text-center p-6 max-w-[357px] hover:scale-105 transition-transform duration-300"
          whileHover={{ y: -5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src="/icons/map.png"
              alt="Availability"
              width={64}
              height={64}
              className="w-[56px] h-[56px] md:w-[64px] md:h-[64px]"
            />
          </motion.div>
          <h3 className="font-bold text-[16px] md:text-[20px] mt-4 mb-2">
            Availability
          </h3>
          <p className="text-[14px] md:text-[16px] text-black60">
            Diam tincidunt tincidunt erat at semper fermentum. Id ultricies quis
          </p>
        </motion.div>
      </StaggeredItem>

      <StaggeredItem>
        <motion.div 
          className="flex flex-col items-center text-center p-6 max-w-[357px] hover:scale-105 transition-transform duration-300"
          whileHover={{ y: -5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Image
              src="/icons/comfort.png"
              alt="Comfort"
              width={64}
              height={64}
              className="w-[56px] h-[56px] md:w-[64px] md:h-[64px]"
            />
          </motion.div>
          <h3 className="font-bold text-[16px] md:text-[20px] mt-4 mb-2">
            Comfort
          </h3>
          <p className="text-[14px] md:text-[16px] text-black60">
            Gravida auctor fermentum morbi vulputate ac egestas orcietium convallis
          </p>
        </motion.div>
      </StaggeredItem>

      <StaggeredItem>
        <motion.div 
          className="flex flex-col items-center text-center p-6 max-w-[357px] hover:scale-105 transition-transform duration-300"
          whileHover={{ y: -5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src="/icons/saving.png"
              alt="Savings"
              width={64}
              height={64}
              className="w-[56px] h-[56px] md:w-[64px] md:h-[64px]"
            />
          </motion.div>
          <h3 className="font-bold text-[16px] md:text-[20px] mt-4 mb-2">
            Savings
          </h3>
          <p className="text-[14px] md:text-[16px] text-black60">
            Pretium convallis id diam sed commodo vestibulum lobortis volutpat
          </p>
        </motion.div>
      </StaggeredItem>
    </StaggeredAnimation>
  );
}
