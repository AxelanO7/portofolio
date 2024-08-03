"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import clsx from "clsx";
import { useState } from "react";
import imgSiapenku from "@/public/siapenku.png";
import imgSigapura from "@/public/sigapura.png";
import imgKoi from "@/public/koi.png";
import imgTeacherPayroll from "@/public/teacher_payroll.png";
import imgColorLearning from "@/public/color_learning.png";
import imgCalculator from "@/public/calculator.png";
import Image from "next/image";

export default function ProjectSection() {
  const projects = [
    {
      name: "Siapenku",
      description:
        "Website for managing administrative data such as population data and submitting administrative letters.",
      image: imgSiapenku,
      techStack: ["Laravel", "Vue"],
      github: "https://github.com/AxelanO7/siapenku-web-php",
      demo: "",
    },
    {
      name: "Sigapura",
      description:
        "Website to digitize shrines in a temple with 3D model features",
      image: imgSigapura,
      techStack: ["PHP"],
      github: "https://github.com/AxelanO7/sigapura-web-php",
      demo: "",
    },
    {
      name: "KOI",
      description:
        "website designed to optimize interactions among students, organizations, and activities within a campus community, with activities categorized and organized",
      image: imgKoi,
      techStack: ["React", "Go"],
      github: "https://github.com/AxelanO7/koi-frontend-web-js",
      demo: "",
    },
    {
      name: "Calculator",
      description:
        "Versatile calculator application capable of adapting to various screen sizes while incorporating user authentication and external data retrieval functionalities.",
      image: imgCalculator,
      techStack: ["Flutter"],
      github: "https://github.com/AxelanO7/live-code-hybrid-flutter",
      demo: "",
    },
    {
      name: "Color Learning",
      description: "Mobile application for the introduction of various colors.",
      image: imgColorLearning,
      techStack: ["Java"],
      github: "https://github.com/AxelanO7/color-learning-mobile-java",
      demo: "",
    },
    {
      name: "Teacher Payroll",
      description:
        "Mobile app for teachers: Attendance tracking (location, photo), time-off requests, pay slips.",
      image: imgTeacherPayroll,
      techStack: ["Flutter"],
      github: "https://github.com/AxelanO7/payroll-mobile-flutter",
      demo: "",
    },
  ];

  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <section className="flex flex-col min-h-[calc(100vh-4rem)] justify-center items-center projects py-16">
      <h1 className="text-4xl font-bold text-teal-500">Projects</h1>
      <hr className="w-48 border-2 border-teal-500 rounded-full mb-8 mt-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mx-auto transition-all duration-300 border-2 border-teal-500 rounded-lg p-4">
        {isShowMore
          ? projects.map((project, index) => (
              <Card
                key={index}
                className="w-full p-4 hover:shadow-xl bg-gradient-to-br from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 hover:text-black hover:scale-105 transform"
              >
                <CardHeader>
                  <h2 className="text-2xl font-bold">{project.name}</h2>
                </CardHeader>
                <CardBody className="flex flex-col justify-between items-start min-h-[10rem] border-y-2 border-teal-500 py-4">
                  <p className="mt-2 text-gray-100">{project.description}</p>
                  <div className="flex flex-wrap mt-4">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full text-sm mr-2 mb-2 bg-gradient-to-r from-teal-400 to-teal-300 text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardBody>
                <CardFooter className="flex justify-between items-center">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      "px-4 py-2 rounded-md text-sm font-semibold text-teal-500 hover:bg-teal-500 hover:text-white",
                      "bg-white"
                    )}
                  >
                    GitHub
                  </a>
                </CardFooter>
              </Card>
            ))
          : projects
              .slice(0, isShowMore ? projects.length : 6)
              .map((project, index) => (
                <Card
                  key={index}
                  className="w-full hover:shadow-xl hover:scale-105 transform"
                  isFooterBlurred
                >
                  <Image src={project.image || ""} alt={project.name} />
                  <CardFooter className="bg-gradient-to-br from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 hover:text-black flex justify-between items-center p-4">
                    <div className="flex space-x-4 justify-items-center">
                      <h2 className="text-2xl font-bold">{project.name}</h2>
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-full text-sm mr-2 mb-2 bg-gradient-to-r from-teal-400 to-teal-300 text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(
                        "px-4 py-2 rounded-md text-sm font-semibold text-teal-500 hover:bg-teal-500 hover:text-white bg-white"
                      )}
                    >
                      GitHub
                    </a>
                  </CardFooter>
                </Card>
              ))}
      </div>
    </section>
  );
}