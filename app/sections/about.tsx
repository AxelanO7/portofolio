import React from "react";

export default function AboutSection() {
  return (
    <section className="flex flex-col min-h-[calc(100vh-4rem)] justify-center items-center about">
      <h1 className="text-4xl font-bold text-teal-500">About Me</h1>
      <hr className="w-48 border-2 border-teal-500 rounded-full mb-8 mt-2" />
      <div className="max-w-3xl mx-auto sm:mx-0 sm:w-full text-teal-50 sm:text-lg text-center space-y-4">
        <p>
          Seasoned Tech Lead with a proven track record in mobile and web
          application development, leveraging extensive expertise in a diverse
          range of programming languages including JavaScript, Go, Dart, Kotlin,
          Swift, TypeScript, Java, Python, PHP, C++, and C#. Skilled in leading
          and mentoring cross-functional development teams to deliver robust,
          scalable, and user-centric solutions across multiple platforms. Adept
          at aligning technical strategies with business goals to drive
          innovation and efficiency.
        </p>
        <p>
          Proficient in building innovative applications from conception to
          deployment, with a strong foundation in modern software development
          methodologies such as Agile and DevOps. Experienced in utilizing
          cutting-edge frameworks and technologies, including Flutter, React.js,
          Vue.js, Angular, Node.js, .NET, Next.js, Flask, Laravel, and
          CodeIgniter, to create seamless, high-performance applications.
          Passionate about solving complex problems and delivering solutions
          that enhance user operational effectiveness.
        </p>
        <p>
          Committed to staying at the forefront of technological advancements,
          continuously exploring emerging tools and trends to maintain a
          competitive edge. A collaborative leader who fosters a culture of
          innovation, knowledge sharing, and continuous improvement within
          development teams. Dedicated to delivering high-quality, scalable, and
          future-proof solutions that meet the evolving needs of businesses.
        </p>
      </div>
    </section>
  );
}
