import React from "react";

export default function AboutSection() {
  return (
    <section className="flex flex-col min-h-[calc(100vh-4rem)] justify-center items-center about">
      <h1 className="text-4xl font-bold text-teal-500">About Me</h1>
      <hr className="w-48 border-2 border-teal-500 rounded-full mb-8 mt-2" />
      <div className="max-w-3xl mx-auto sm:mx-0 sm:w-full text-teal-50 sm:text-lg text-center space-y-4">
        <p>
          I have a strong foundation in full-stack web development, with
          experience in both front-end and back-end technologies. I'm proficient
          in modern frameworks like React and Vue, and I'm comfortable working
          with both SQL and NoSQL databases.
        </p>
        <p>
          My experience in mobile development has given me a deep understanding
          of iOS and Android platforms, as well as cross-platform development
          tools like Flutter. I'm also well-versed in UI/UX design principles,
          ensuring that the applications I build are not only functional but
          also visually appealing.
        </p>
        <p>
          I'm passionate about learning new technologies and staying up-to-date
          with the latest industry trends. This drive to continuously improve my
          skills allows me to adapt to new challenges and deliver high-quality
          solutions that meet the needs of my clients.
        </p>

        {/* <p>
          I thrive in a collaborative environment and possess strong leadership
          skills, honed through my experience as a tech lead. I'm adept at
          motivating and mentoring team members, fostering a culture of open
          communication, and ensuring everyone feels empowered to contribute
          their best work.
        </p>
        <p>
          My passion for learning new technologies fuels my drive to explore
          various tech stacks, allowing me to bring a versatile skillset to the
          This not only benefits mobile development but also allows me to
          contribute meaningfully to website development projects. table.
        </p> */}

        {/* <p>
          I thrive in a collaborative environment and possess strong leadership
          skills, honed through my experience as a tech lead. I'm adept at
          motivating and mentoring team members, fostering a culture of open
          communication, and ensuring everyone feels empowered to contribute
          their best work. My leadership style prioritizes fostering a safe
          space for sharing ideas and constructive criticism, leading to
          innovative solutions and a highly engaged team.
        </p>
        <p>
          My passion for learning new technologies fuels my drive to explore
          various tech stacks. This isn't just about staying relevant - it's
          about identifying the best tools for the job, regardless of the
          platform. This versatility allows me to not only excel in mobile
          development but also contribute meaningfully to website development
          projects.
        </p>
        <p>
          I'm comfortable diving deep into new frameworks and languages, and I
          enjoy sharing that knowledge with my colleagues. In addition to
          technical expertise, I believe strong communication skills are
          essential for successful leadership. I excel at clearly articulating
          complex ideas, both verbally and in writing.
        </p>
        <p>
          This ensures everyone on the team understands the project goals,
          individual responsibilities, and the bigger picture. I'm also a
          patient and active listener, fostering open communication that allows
          for early problem identification and a proactive approach to
          challenges.
        </p> */}
      </div>
    </section>
  );
}
