import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLeaf } from "react-icons/fa";

const slides = [
  {
    title: "Premium Fertilizers",
    description: "Boost your crop yield with high-quality fertilizers.",
  },
  {
    title: "Effective Pesticides",
    description: "Protect crops from harmful pests and common diseases.",
  },
  {
    title: "Organic Solutions",
    description: "Eco-friendly products for sustainable agriculture.",
  },
];

const AgriStoreHeader = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-b from-green-800 to-green-600 py-10">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mt-8 flex items-center justify-center text-3xl font-bold text-white md:text-5xl">
          <FaLeaf className="mr-3 text-white" />
          Buy Materials
        </h1>

        <div className="mx-auto mt-6 max-w-4xl rounded-lg">
          <div className="flex min-h-[140px] flex-col justify-center p-6 md:min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <h2 className="mb-2 text-xl font-bold text-white md:text-2xl">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-base text-green-100 md:text-xl">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgriStoreHeader;

