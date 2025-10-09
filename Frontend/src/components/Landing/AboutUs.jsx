
import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import AboutUsImage from "../../assets/images/AboutUs.png"

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 flex flex-col items-center justify-start p-6 pt-12">

      {/* Hero Section with Our Mission */}
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between mb-12 gap-10">
        {/* Text Section */}
        <div className="md:w-1/2 text-white">
          <h1 className="text-4xl font-bold mb-4">Our Mission</h1>
          <p className="text-lg leading-relaxed mb-4">
            Our mission is to build a smarter, cleaner, and more responsive city management system.
            With features like complaint registration, real-time status tracking, and monthly reports,
            this platform empowers citizens and authorities to collaborate effectively in solving issues
            related to garbage, sewage, water, and road maintenance.
          </p>
          <p className="text-lg leading-relaxed">
            This project is developed with dedication by our team, aiming to make city life more organized,
            sustainable, and citizen-friendly through the power of technology.
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-end">
          <img
            src={AboutUsImage}
            alt="About Us"
            className="w-full max-w-md rounded-2xl shadow-xl"
          />
        </div>
      </div>

      {/* Team Contributors */}
      <br />
      <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
        {[
          {
            name: "Anirudh Dixit",
            image: "https://media.licdn.com/dms/image/v2/D4D03AQHBtNxYsiq1Tg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1711910822959?e=1755734400&v=beta&t=4q2JYQa_eJ9bG3cryHvKkqqs6zk2hrktSDOU9sDofck",
            text: "I worked on building a responsive and user-friendly interface so that citizens can easily raise complaints and track their status in real time.",
            linkedin: "https://www.linkedin.com/in/sumitslin/",
            github: "https://github.com/Sumit736-web"
          },
          {
            name: "Aman Poddar",
            image: "https://media.licdn.com/dms/image/v2/D5603AQEEHI4Fl-e5jQ/profile-displayphoto-shrink_800_800/B56ZQxi3GcGoAg-/0/1735998011115?e=1755734400&v=beta&t=HUN0AUKgoC58SO7n2gzGz-HLG9w4tTEiP1rli7NMZCA",
            text: "I developed the backend systems to handle complaint workflows, staff assignment, and monthly reporting to ensure smooth city management.",
            linkedin: "https://www.linkedin.com/in/amanpoddar2003/",
            github: "https://github.com/Aman20-debug"
          },
          {
            name: "Anshu Gupta",
            image: "https://media.licdn.com/dms/image/v2/D4D03AQEUl0ib4W_22g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718249436001?e=1762387200&v=beta&t=tEI1dqYMfezLw-MiSHbabOgVbLm3wousbOcCWxHUL4Y://media.licdn.com/dms/image/v2/D4D03AQEUl0ib4W_22g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718249436001?e=1755734400&v=beta&t=4qsyKe8TP_d2Fn2HAWh2V5ke9GdNVvi7BHRwxEgOnXc",
            text: "I contributed to implementing key features like role-based access (citizen, staff, admin) and improving overall user experience for better collaboration.",
            linkedin: "https://www.linkedin.com/in/anshu-gupta-4120212a8/",
            github: "https://github.com/AnshuGupta9931"
          },
        ].map(({ name, role, image, text, linkedin, github }, idx) => (
          <div
            key={idx}
            className="text-sm w-80 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-300 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 animate-fadeIn"
          >
            <div className="flex flex-col items-center px-5 py-4 relative">
              <img className="h-24 w-24 absolute -top-14 rounded-full object-cover border-4 border-white shadow-md" src={image} alt={name} />
              <div className="pt-10 text-center">
                <h1 className="text-lg font-medium text-gray-800">{name}</h1>
                <p className="text-gray-600">{role}</p>
              </div>
            </div>
            <p className="text-gray-500 px-6 text-center mb-4">{text}</p>

            {/* Social Icons */}
            <div className="flex justify-center space-x-4">
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xl">
                <FaLinkedin />
              </a>
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black text-xl">
                <FaGithub />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;