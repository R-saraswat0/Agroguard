import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaCheckCircle,
  FaChevronDown,
  FaClock,
  FaRobot,
  FaChartLine,
  FaGraduationCap,
  FaPiggyBank,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import WhatWeOffer from "../components/WhatWeOffer";

const recentArticles = [
  {
    title: "5 Early Signs of Plant Disease Every Farmer Should Know",
    excerpt:
      "Learn to spot subtle indicators of plant health issues before they become major problems.",
    date: "2023-07-15",
    image:
      "https://th.bing.com/th/id/OIP.o3qRYnynMzJSlVudwbsLAQHaFE?rs=1&pid=ImgDetMain",
  },
  {
    title: "AI in Agriculture: Revolutionizing Crop Protection",
    excerpt:
      "Discover how artificial intelligence is changing crop protection for farmers worldwide.",
    date: "2023-07-10",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/032/718/079/small_2x/ai-generative-modern-robot-with-artificial-intelligence-harvest-organic-plants-in-an-urban-greenhouse-new-technologies-in-agriculture-horizontal-photo.jpg",
  },
  {
    title: "Organic vs. Chemical Treatments: Making the Right Choice",
    excerpt:
      "A practical comparison of treatment approaches so you can choose confidently.",
    date: "2023-07-05",
    image:
      "https://th.bing.com/th/id/R.1fa7b43360bdadd5b2e9a49d621242a1?rik=ah0S53PGybCaRw&pid=ImgRaw&r=0",
  },
];

const benefits = [
  {
    title: "Cutting-Edge AI Technology",
    description:
      "Advanced algorithms provide accurate disease detection and personalized treatment plans.",
    Icon: FaRobot,
  },
  {
    title: "Eco-Friendly Solutions",
    description:
      "We prioritize sustainable and organic options to protect crops and the environment.",
    Icon: FaLeaf,
  },
  {
    title: "Real-Time Monitoring",
    description:
      "Stay ahead of outbreaks with continuous monitoring and early warning signals.",
    Icon: FaChartLine,
  },
  {
    title: "Expert Knowledge Base",
    description:
      "Access practical insights from agricultural experts and AI-powered recommendations.",
    Icon: FaGraduationCap,
  },
  {
    title: "Cost-Effective Farming",
    description:
      "Reduce crop loss and optimize treatment usage to save time and money.",
    Icon: FaPiggyBank,
  },
];

const faqs = [
  {
    question: "How does AgriGuard detect plant diseases?",
    answer:
      "AgriGuard uses computer vision and machine learning models trained on a large disease image dataset to identify visible symptoms and patterns.",
  },
  {
    question: "What crops are supported?",
    answer:
      "The platform supports common fruits, vegetables, and grains. Coverage is expanded continuously as new data is added.",
  },
  {
    question: "How accurate are the results?",
    answer:
      "For common and well-represented diseases, results are highly accurate. We still recommend confirming critical cases with experts.",
  },
  {
    question: "Does AgriGuard provide treatment recommendations?",
    answer:
      "Yes. Recommendations include practical options with a focus on sustainable and safe approaches.",
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-green-200 last:border-b-0">
      <button
        className="flex w-full items-center justify-between px-4 py-5 text-left"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-base font-semibold text-green-900 md:text-lg">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown className="text-green-700" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-5 text-gray-700">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const whatWeOfferRef = useRef(null);

  const handleGetStarted = () => {
    whatWeOfferRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white text-green-900">
      <Navbar />

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=2070&q=80')",
            filter: "blur(4px)",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold leading-tight md:text-6xl"
          >
            Protect Plants with AgriGuard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 max-w-3xl text-lg text-green-50 md:text-2xl"
          >
            Advanced plant disease detection and practical treatment guidance for
            smarter farming decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={handleGetStarted}
              className="rounded-full bg-green-600 px-8 py-3 text-lg font-semibold transition hover:bg-green-700"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/viewarticles")}
              className="rounded-full border-2 border-white px-8 py-3 text-lg font-semibold transition hover:bg-white hover:text-green-900"
            >
              Explore Articles
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {[
              { Icon: FaCheckCircle, label: "99% Accuracy" },
              { Icon: FaLeaf, label: "50+ Disease Types" },
              { Icon: FaClock, label: "24/7 Monitoring" },
            ].map((item) => (
              <div
                key={item.label}
                className="mx-auto flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur-sm"
              >
                <item.Icon className="text-green-300" />
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <WhatWeOffer ref={whatWeOfferRef} />

      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
            Recent Articles
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {recentArticles.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="overflow-hidden rounded-xl bg-white shadow-md"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{article.title}</h3>
                  <p className="mt-2 text-gray-600">{article.excerpt}</p>
                  <p className="mt-4 text-sm text-gray-500">{article.date}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-white to-green-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <benefit.Icon className="text-2xl text-green-700" />
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                </div>
                <p className="mt-3 text-gray-700">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              "Take a photo of your plant",
              "Upload it to AgriGuard",
              "Get instant disease analysis",
            ].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col items-center rounded-xl bg-green-50 p-6 text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-xl font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-lg">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="overflow-hidden rounded-xl border border-green-100 bg-white shadow-sm">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-800 py-14 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to protect your plants?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-green-100">
            Join AgriGuard and make faster, data-driven crop health decisions.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="mt-8 rounded-full bg-white px-8 py-3 text-lg font-semibold text-green-700 transition hover:bg-green-100"
          >
            Sign Up Now
          </button>
        </div>
      </section>

      <footer className="bg-green-900 py-10 text-white">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3">
          <div>
            <h4 className="text-xl font-semibold">AgriGuard</h4>
            <p className="mt-3 text-green-100">
              AI-powered plant disease detection and guidance for resilient farming.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-green-100">
              <li>
                <button onClick={() => navigate("/")} className="hover:text-white">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/viewarticles")} className="hover:text-white">
                  Articles
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/materials/buy")} className="hover:text-white">
                  AgriStore
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Contact</h4>
            <p className="mt-3 text-green-100">support@agriguard.com</p>
            <p className="text-green-100">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 border-t border-green-700 pt-4 text-center text-green-200">
          <p>&copy; {new Date().getFullYear()} AgriGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

