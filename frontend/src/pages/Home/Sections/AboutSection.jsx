import React from "react";
import { motion } from "framer-motion";
import { Coffee, Heart, Users, Lightbulb, Target, Award } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: <Heart />,
      title: "Student-Centric",
      desc: "Every feature is designed with student success in mind",
    },
    {
      icon: <Lightbulb />,
      title: "Innovation",
      desc: "Cutting-edge technology meets proven learning methodologies",
    },
    {
      icon: <Users />,
      title: "Community",
      desc: "Building connections that enhance the learning experience",
    },
    {
      icon: <Target />,
      title: "Excellence",
      desc: "Committed to helping you achieve your highest potential",
    },
  ];

  const stats = [
    { number: "2019", label: "Founded", desc: "When our journey began" },
    { number: "50K+", label: "Students", desc: "Learning with us daily" },
    { number: "150+", label: "Universities", desc: "Trust our platform" },
    { number: "95%", label: "Success Rate", desc: "Students improve grades" },
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "CEO & Co-Founder",
      background:
        "Former Stanford professor with 15 years in educational technology",
      emoji: "👩‍🏫",
    },
    {
      name: "Alex Chen",
      role: "CTO & Co-Founder",
      background: "Ex-Google engineer passionate about AI-powered learning",
      emoji: "👨‍💻",
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Education",
      background: "Learning specialist with expertise in cognitive psychology",
      emoji: "🧠",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="w-full max-w-7xl mx-auto mb-20 px-6"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="mb-6 inline-flex items-center px-6 py-3 rounded-full bg-[#fffaf2]/90 backdrop-blur-sm border border-[#e0c9a6]/50 shadow-lg">
          <span className="text-2xl mr-3">📖</span>
          <span className="text-[#6b4226] font-semibold text-lg">
            Our Story
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-extrabold text-[#6b4226] mb-6 leading-tight">
          Brewing Excellence in
          <span className="bg-gradient-to-r from-[#8c5e3c] to-[#b08968] bg-clip-text text-transparent block">
            Education Since 2019
          </span>
        </h2>
        <p className="text-[#6b4226]/70 text-xl max-w-4xl mx-auto leading-relaxed">
          Born from the belief that learning should be as enjoyable as your
          morning coffee, StudyBrew has grown into a platform trusted by
          students worldwide.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-8 bg-[#fffaf2]/80 backdrop-blur-sm rounded-3xl border border-[#e0c9a6]/40 shadow-xl"
        >
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#b08968] to-[#8c5e3c] text-white">
            <Target />
          </div>
          <h3 className="text-3xl font-bold text-[#6b4226] mb-4">
            Our Mission
          </h3>
          <p className="text-[#6b4226]/70 text-lg leading-relaxed">
            To democratize quality education by providing intelligent,
            personalized learning tools that adapt to every student's unique
            needs and learning style. We believe that with the right support,
            every student can achieve their academic dreams.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="p-8 bg-[#fffaf2]/80 backdrop-blur-sm rounded-3xl border border-[#e0c9a6]/40 shadow-xl"
        >
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#b08968] to-[#8c5e3c] text-white">
            <Lightbulb />
          </div>
          <h3 className="text-3xl font-bold text-[#6b4226] mb-4">Our Vision</h3>
          <p className="text-[#6b4226]/70 text-lg leading-relaxed">
            To create a world where learning is engaging, effective, and
            accessible to all. We envision classrooms without walls, where
            students from every background can unlock their potential through
            technology-enhanced education.
          </p>
        </motion.div>
      </div>

      {/* Our Story */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-20"
      >
        <div className="bg-gradient-to-r from-[#8c5e3c]/5 to-[#b08968]/5 backdrop-blur-sm rounded-3xl border border-[#e0c9a6]/30 p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">☕</div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#6b4226] mb-6">
              How StudyBrew Was Born
            </h3>
            <div className="text-[#6b4226]/70 text-lg leading-relaxed space-y-4">
              <p>
                It all started in a small coffee shop near Stanford University.
                Dr. Sarah Mitchell, a professor struggling to help her students
                engage with traditional learning methods, met Alex Chen, a
                software engineer frustrated with his own learning experiences
                during night classes.
              </p>
              <p>
                Over countless cups of coffee, they realized that learning
                didn't have to be a chore. Just like brewing the perfect cup
                requires the right temperature, timing, and technique, effective
                learning needed the right blend of technology, pedagogy, and
                personal touch.
              </p>
              <p>
                That conversation sparked the idea for StudyBrew – a platform
                that would make learning as satisfying and energizing as that
                first sip of morning coffee. Today, we're proud to serve over
                50,000 students worldwide, each on their own unique learning
                journey.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Values */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-bold text-[#6b4226] mb-4">
            Our Core Values
          </h3>
          <p className="text-[#6b4226]/70 text-lg max-w-2xl mx-auto">
            The principles that guide everything we do at StudyBrew
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 bg-[#fffaf2]/70 backdrop-blur-sm rounded-2xl border border-[#e0c9a6]/40 shadow-lg hover:shadow-xl transition-all text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#b08968] to-[#8c5e3c] text-white">
                {value.icon}
              </div>
              <h4 className="text-[#6b4226] font-bold text-lg mb-3">
                {value.title}
              </h4>
              <p className="text-[#6b4226]/60 text-sm leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mb-20"
      >
        <div className="bg-gradient-to-r from-[#b08968]/10 to-[#8c5e3c]/10 backdrop-blur-sm rounded-3xl border border-[#e0c9a6]/40 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-[#6b4226] mb-4">
              Our Impact in Numbers
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#6b4226] mb-2">
                  {stat.number}
                </div>
                <div className="text-[#6b4226] font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-[#6b4226]/60 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Team */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-bold text-[#6b4226] mb-4">
            Meet Our Founders
          </h3>
          <p className="text-[#6b4226]/70 text-lg max-w-2xl mx-auto">
            The passionate educators and technologists behind StudyBrew
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="p-8 bg-[#fffaf2]/80 backdrop-blur-sm rounded-2xl border border-[#e0c9a6]/40 shadow-lg hover:shadow-xl transition-all text-center"
            >
              <div className="text-6xl mb-4">{member.emoji}</div>
              <h4 className="text-xl font-bold text-[#6b4226] mb-2">
                {member.name}
              </h4>
              <div className="text-[#b08968] font-semibold mb-4">
                {member.role}
              </div>
              <p className="text-[#6b4226]/70 text-sm leading-relaxed">
                {member.background}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Closing Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-[#8c5e3c]/10 to-[#b08968]/10 backdrop-blur-sm rounded-2xl border border-[#e0c9a6]/40 p-8 md:p-12">
          <Coffee className="w-16 h-16 mx-auto mb-6 text-[#8c5e3c]" />
          <h3 className="text-3xl md:text-4xl font-bold text-[#6b4226] mb-6">
            Join Our Growing Community
          </h3>
          <p className="text-[#6b4226]/70 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            We're more than just a study platform – we're a community of
            learners, educators, and dreamers working together to make education
            more accessible, engaging, and effective. Come brew your success
            with us!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition"
            >
              Start Your Journey
            </a>
            <a
              href="/contact"
              className="px-8 py-4 rounded-full border-2 border-[#b08968] bg-[#fffaf2]/80 text-[#6b4226] font-bold text-lg hover:bg-[#fffaf2] hover:border-[#8c5e3c] transform hover:-translate-y-1 transition"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AboutSection;
