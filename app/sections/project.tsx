import { Card, CardFooter } from "@nextui-org/card";
import imgSiapenku from "@/public/siapenku.png";
import imgSigapura from "@/public/sigapura.png";
import imgKoi from "@/public/koi.png";
import imgTeacherPayroll from "@/public/teacher_payroll.png";
import imgColorLearning from "@/public/color_learning.png";
import imgCalculator from "@/public/calculator.png";
import imgAssyarif from "@/public/assyarif.png";
import imgBnShop from "@/public/bn_shop.png";
import imgVillaManis from "@/public/villa_manis.png";
import imgSmartBtw from "@/public/smartbtw.png";
import imgBtwEdutech from "@/public/btwedutech.png";
import imgJobseerApp from "@/public/jobseeker_app.png";
import imgJobseerPartners from "@/public/jobseeker_partners.png";
import imgSujana from "@/public/sujana.png";
import imgVMUC from "@/public/vmuc.png";
import Image from "next/image";

export default function ProjectSection() {
  const projects = [
    {
      name: "Siapenku",
      shortDescription:
        "Website for managing administrative data such as population data and submitting administrative letters.",
      description:
        "This information system is designed to effectively manage and analyze administrative data pertaining to the population of Bulian Village within Kubutambahan District. The system aims to provide a comprehensive and up-to-date database of demographic information, facilitating efficient governance, policymaking, and service delivery.",
      image: imgSiapenku,
      techStack: ["Laravel", "Vue"],
      link: "http://siapenku.stion.site",
      demo: "",
    },
    {
      name: "Sigapura",
      shortDescription:
        "Website to digitize shrines in a temple with 3D model features",
      description:
        "This project aims to develop a comprehensive online platform dedicated to the digitization and preservation of temple shrines. By leveraging advanced 3D modeling and imaging technologies, we will create an immersive virtual environment that allows users to explore and interact with these sacred spaces in unprecedented detail.",
      image: imgSigapura,
      techStack: ["PHP"],
      link: "https://github.com/AxelanO7/sigapura-web-php",
      demo: "",
    },
    {
      name: "KOI",
      shortDescription:
        "Website designed to optimize interactions among students, organizations, and activities within a campus community, with activities categorized and organized",
      description:
        "This project entails the development of a comprehensive online platform designed to streamline and enhance interactions within a campus community. By categorizing and organizing campus activities, the website will serve as a centralized hub for students to discover and engage with diverse opportunities, clubs, and events. This platform aims to foster a stronger sense of community, facilitate collaboration between students and organizations, and optimize the overall campus experience.",
      image: imgKoi,
      techStack: ["React", "Go"],
      link: "https://github.com/AxelanO7/koi-frontend-web-js",
      demo: "",
    },
    {
      name: "BN Shop",
      shortDescription:
        "This web-based application is designed to streamline the management of inventory, providing a centralized platform for tracking incoming and outgoing goods",
      description:
        "This web-based application streamlines inventory management by providing real-time tracking of incoming and outgoing goods, automating processes like reorder points and inventory adjustments, generating accurate reports, and improving inventory accuracy and visibility. By optimizing these aspects, businesses can enhance efficiency, reduce costs, and make informed decisions.",
      image: imgBnShop,
      techStack: ["React", "Go"],
      link: "https://github.com/AxelanO7/bn-shop-frontend-web-js",
      demo: "",
    },
    {
      name: "Villa Manis",
      shortDescription:
        "This web-based application is designed to streamline financial and accounting processes, providing a centralized platform for managing and analyzing financial data",
      description:
        "This web-based application streamlines financial and accounting processes by providing comprehensive reporting, efficient data management, real-time analytics, compliance management, and integration capabilities. By automating and optimizing these aspects, businesses can improve efficiency, enhance decision-making, and ensure financial accuracy and compliance.",
      image: imgVillaManis,
      techStack: ["React", "Go"],
      link: "https://github.com/AxelanO7/villa-manis-frontend-web-js",
      demo: "",
    },
    {
      name: "Assyarif",
      shortDescription:
        "This web-based application streamlines inventory management by providing real-time tracking, automated reordering, accurate reporting, and tools to improve inventory accuracy and visibility.",
      description:
        "This web-based application streamlines inventory management by providing real-time tracking, automated reordering, accurate reporting, and tools to improve inventory accuracy and visibility. By automating and optimizing these aspects, businesses can enhance efficiency, reduce costs, and make informed decisions.",
      image: imgAssyarif,
      techStack: ["React", "Go"],
      link: "https://github.com/AxelanO7/assyarif-frontend-web-js",
      demo: "",
    },
    {
      name: "Sujana",
      shortDescription:
        "A marketing and booking information system designed to streamline tour package management, improve operational efficiency, and enhance customer experience for Sujana Tour and Travel in Bali.",
      description:
        "This project focuses on developing a comprehensive 'Marketing and Booking Information System' for Sujana Tour and Travel, located in Denpasar, Bali. The system aims to address the challenges of manual booking processes, such as missed orders and lack of clear revenue data, by providing an integrated solution for managing bookings, scheduling, payments, and order tracking. By leveraging technology, the system will improve operational efficiency, reduce errors, and enhance the overall customer experience. The implementation of this system is expected to positively impact the growth of the tourism industry in Bali by offering a more reliable and efficient service to travelers.",
      image: imgSujana,
      techStack: ["React", "Go"],
      link: "https://github.com/AxelanO7/sujana-frontend-web-js",
      demo: "",
    },
    {
      name: "VMUC",
      shortDescription:
        "A web-based financial reporting system designed to streamline and automate financial management for Villa Munduk Umah Cabbin, ensuring accurate and efficient data processing.",
      description:
        "This project focuses on designing and developing a web-based financial reporting system for Villa Munduk Umah Cabbin to address challenges in manual financial management. The system aims to automate the recording of financial transactions, including guest reservations, employee payroll, and monthly financial reports. By integrating subsystems for data processing and financial intelligence, the system will enhance data accuracy, reduce errors, and save time in generating financial reports. Additionally, it will minimize paper usage and provide real-time insights into the villa's financial performance, helping the management make informed decisions.",
      image: imgVMUC,
      techStack: ["React", "Go"],
      link: "https://github.com/AxelanO7/vmuc-fintech-frontend-web-js",
      demo: "",
    },
    {
      name: "Calculator",
      shortDescription:
        "Versatile calculator application capable of adapting to various screen sizes while incorporating user authentication and external data retrieval functionalities.",
      description:
        "This project aims to develop a highly adaptable calculator application capable of seamlessly adjusting its interface to accommodate diverse screen sizes, from compact smartphones to expansive tablets. To ensure data privacy and security, the app will incorporate robust user authentication mechanisms. Furthermore, it will be designed to dynamically fetch external data, such as real-time financial information or scientific constants, enhancing its utility and providing users with access to up-to-date calculations and computations.",
      image: imgCalculator,
      techStack: ["Flutter"],
      link: "https://github.com/AxelanO7/live-code-hybrid-flutter",
      demo: "",
    },
    {
      name: "Smart BTW",
      shortDescription:
        "This mobile application aims to provide a realistic simulation experience for individuals preparing for job tryouts. By offering interactive exercises and assessments.",
      description:
        "This mobile application provides a realistic simulation experience for individuals preparing for job tryouts. By offering interactive exercises, assessments, and personalized feedback, the app helps users develop essential skills, familiarize themselves with the job environment, build confidence, and increase their chances of success in job interviews and tryouts.",
      image: imgSmartBtw,
      techStack: ["Flutter"],
      link: "",
      demo: "",
    },
    {
      name: "BTW Edutech",
      shortDescription:
        "This mobile application aims to provide a realistic simulation experience for individuals preparing for job tryouts. By offering interactive exercises and assessments.",
      description:
        "This mobile application provides a realistic simulation experience for individuals preparing for job tryouts. By offering interactive exercises, assessments, and personalized feedback, the app helps users develop essential skills, familiarize themselves with the job environment, build confidence, and increase their chances of success in job interviews and tryouts.",
      image: imgBtwEdutech,
      techStack: ["Flutter"],
      link: "",
      demo: "",
    },
    {
      name: "Jobseeker .app",
      shortDescription:
        "Mobile app for job seekers: Simplified job search, skill-based matching, and quick job opportunities.",
      description:
        "This project aims to develop a user-friendly mobile application tailored for job seekers, offering a seamless and efficient job search experience. The app will feature a social media-like interface, allowing users to browse and apply for jobs effortlessly. Key functionalities include skill-based job matching, quick access to job opportunities, and a streamlined process to connect users with potential employers. The app eliminates the need for long queues and complex processes, making job hunting as simple as scrolling through social media.",
      image: imgJobseerApp,
      techStack: ["Flutter"],
      link: "https://play.google.com/store/apps/details?id=com.jobseeker.app&hl=id",
      demo: "",
    },
    {
      name: "Jobseeker .partners",
      shortDescription:
        "Mobile app for job seekers: Easy job search, skill matching, fast job opportunities.",
      description:
        "This project creates a user-friendly mobile app for job seekers, simplifying the job search.  It features a social media-like interface for easy browsing and application, skill-based matching to connect job seekers with relevant opportunities, quick access to available jobs, and a streamlined process to connect with employers.  The app makes job hunting as simple as scrolling through social media, eliminating complex processes.",
      image: imgJobseerPartners,
      techStack: ["Flutter"],
      link: "https://play.google.com/store/apps/details?id=com.jobseeker.partners&hl=id",
      demo: "",
    },
    {
      name: "Color Learning",
      shortDescription:
        "Mobile application for the introduction of various colors.",
      description:
        "This project aims to develop a mobile application designed to introduce and explore the vast spectrum of colors. The app will serve as an interactive and engaging platform for users of all ages to learn about color theory, identification, and appreciation.",
      image: imgColorLearning,
      techStack: ["Java"],
      link: "https://github.com/AxelanO7/color-learning-mobile-java",
      demo: "",
    },
    {
      name: "Teacher Payroll",
      shortDescription:
        "Mobile app for teachers: Attendance tracking (location, photo), time-off requests, pay slips.",
      description:
        "This project aims to develop a comprehensive mobile application designed specifically for teachers, offering features to streamline various administrative tasks. Core functionalities include robust attendance tracking capabilities utilizing location data and photo verification, a user-friendly platform for submitting time-off requests, and a secure portal for accessing and reviewing pay slips, all accessible conveniently through a mobile interface.",
      image: imgTeacherPayroll,
      techStack: ["Flutter"],
      github: "https://github.com/AxelanO7/payroll-mobile-flutter",
      demo: "",
    },
  ];

  return (
    <section className="flex flex-col min-h-[calc(100vh-4rem)] justify-center items-center projects py-16">
      <h1 className="text-4xl font-bold text-teal-500">Projects</h1>
      <hr className="w-48 border-2 border-teal-500 rounded-full mb-8 mt-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-auto transition-all duration-300 border-2 border-teal-500 rounded-lg p-4">
        {projects.map((project, index) => (
          <Card key={index} className="hover:scale-105 transform">
            <a href={project.link} target="_blank" rel="noreferrer noopener">
              <Image
                src={project.image || ""}
                alt={project.name}
                className="object-cover h-64 w-full"
              />
              <CardFooter className="bg-gradient-to-br from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 hover:text-black flex justify-between items-center p-4">
                <div className="flex justify-between w-full">
                  <h2 className="text-md font-semibold">{project.name}</h2>
                  <div className="flex gap-2">
                    {project.techStack.map((tech, index) => (
                      <div
                        key={index}
                        className="text-xs font-semibold items-center flex bg-white text-teal-500 px-2 py-1 rounded-md"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </CardFooter>
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}
