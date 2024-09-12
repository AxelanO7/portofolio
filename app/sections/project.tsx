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
import imgSmartBtw from "@/public/smart_btw.png";
import imgBtwEdutech from "@/public/btw_edutech.png";
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
      github: "http://siapenku.stion.site",
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
      github: "https://github.com/AxelanO7/sigapura-web-php",
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
      github: "https://github.com/AxelanO7/koi-frontend-web-js",
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
      github: "https://github.com/AxelanO7/bn-shop-frontend-web-js",
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
      github: "https://github.com/AxelanO7/villa-manis-frontend-web-js",
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
      github: "https://github.com/AxelanO7/assyarif-frontend-web-js",
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
      github: "",
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
      github: "",
      demo: "",
    },
    {
      name: "Versatile Calculator",
      shortDescription:
        "Versatile calculator application capable of adapting to various screen sizes while incorporating user authentication and external data retrieval functionalities.",
      description:
        "This project aims to develop a highly adaptable calculator application capable of seamlessly adjusting its interface to accommodate diverse screen sizes, from compact smartphones to expansive tablets. To ensure data privacy and security, the app will incorporate robust user authentication mechanisms. Furthermore, it will be designed to dynamically fetch external data, such as real-time financial information or scientific constants, enhancing its utility and providing users with access to up-to-date calculations and computations.",
      image: imgCalculator,
      techStack: ["Flutter"],
      github: "https://github.com/AxelanO7/live-code-hybrid-flutter",
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
      github: "https://github.com/AxelanO7/color-learning-mobile-java",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mx-auto transition-all duration-300 border-2 border-teal-500 rounded-lg p-4">
        {projects.map((project, index) => (
          <Card key={index} className="hover:scale-105 transform">
            <a href={project.github} target="_blank" rel="noreferrer noopener">
              <Image src={project.image || ""} alt={project.name} />
              <CardFooter className="bg-gradient-to-br from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 hover:text-black flex justify-between items-center p-4">
                <div className="flex justify-between w-full">
                  <h2 className="text-xl font-semibold">{project.name}</h2>
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
