import { Card, CardFooter } from "@nextui-org/card";
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
                  <div className="text-xs font-semibold items-center flex bg-white text-teal-500 px-2 py-1 rounded-md">
                    {project.techStack.join(", ")}
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
