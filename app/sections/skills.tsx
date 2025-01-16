import {
  CodeIgniterIcon,
  ExpressJsIcon,
  FlaskIcon,
  FlutterIcon,
  LaravelIcon,
  NextJsIcon,
  ReactJsIcon,
  VueJsIcon,
} from "@/components/icons/programming/frameworks";
import {
  CPlusPlusIcon,
  DartIcon,
  GoIcon,
  JavaIcon,
  JavaScriptIcon,
  KotlinIcon,
  PhpIcon,
  PythonIcon,
  SwiftIcon,
  TypeScriptIcon,
} from "@/components/icons/programming/languages";
import React from "react";

export default function SkillSection() {
  const languages = [
    <JavaScriptIcon />,
    <GoIcon />,
    <DartIcon />,
    <KotlinIcon />,
    <SwiftIcon />,
    <TypeScriptIcon />,
    <JavaIcon />,
    <PythonIcon />,
    <PhpIcon />,
    <CPlusPlusIcon />,
  ];

  const frameworks = [
    <FlutterIcon />,
    <ReactJsIcon />,
    <ExpressJsIcon />,
    <NextJsIcon />,
    <VueJsIcon />,
    <FlaskIcon />,
    <LaravelIcon />,
    <CodeIgniterIcon />,
  ];

  return (
    <section className="flex flex-col min-h-screen justify-center items-center skills">
      <h1 className="text-4xl font-bold text-teal-500">Skill Set</h1>
      <hr className="w-48 border-2 border-teal-500 rounded-full mt-2" />
      <h2 className="text-2xl font-bold text-teal-50 mb-2 mt-8">
        Languages<span className="text-teal-300"> & </span>
        Tools
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {languages.map((lang, idx) => (
          <div
            key={idx}
            className="hover:scale-110 transform transition-all duration-300"
          >
            {lang}
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold text-center mt-8 text-teal-50 items-center mb-2">
        Frameworks <span className="text-teal-300"> & </span> Libraries
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {frameworks.map((framework, idx) => (
          <div
            key={idx}
            className="hover:scale-110 transform transition-all duration-300"
          >
            {framework}
          </div>
        ))}
      </div>
    </section>
  );
}
