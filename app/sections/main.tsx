"use client";
import Typewriter from "typewriter-effect";

export default function MainSection() {
  const roles = ["Full Stack Web Developer", "Mobile Developer"];
  const handleScroll = () => {
    const element = document.getElementsByClassName("contact");
    if (element.length > 0) {
      element[0].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="flex flex-col min-h-[calc(100vh-4rem)] justify-center items-center space-y-8">
      <h1 className="text-6xl font-bold flex justify-center sm:justify-start text-teal-50">
        Hi, I'm <span className="text-teal-500 animate-pulse mx-4"> Axel </span>
        👋
      </h1>
      <div className="text-xl font-semibold text-white sm:text-2xl sm:leading-relaxed flex space-x-2">
        <p
          className="animate-pulse text-teal-500"
          style={{
            animationDelay: "0.5s",
          }}
        >
          |
        </p>
        <Typewriter
          options={{
            strings: roles,
            autoStart: true,
            loop: true,
          }}
        />
        <p
          className="animate-pulse text-teal-500"
          style={{
            animationDelay: "0.5s",
          }}
        >
          |
        </p>
      </div>
      <p className="max-w-lg mx-auto sm:mx-0 w-96 sm:w-full text-teal-50 sm:text-lg text-center">
        Software Engineer based in the Indonesia. Passionate about building
        beautiful and functional websites and mobile applications.
      </p>
      <button className="sd_btn" onClick={handleScroll}>
        Get in touch
      </button>
    </section>
  );
}
