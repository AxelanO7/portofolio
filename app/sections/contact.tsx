export default function ContactSection() {
  return (
    <section className="flex flex-col min-h-[calc(100vh-4rem)] justify-center items-center contact">
      <h1 className="text-4xl font-bold text-teal-500">Contact</h1>
      <hr className="w-48 border-2 border-teal-500 rounded-full mb-8 mt-2" />
      <form
        action="https://formspree.io/f/mqazqwak"
        method="POST"
        className="flex flex-col gap-4 bg-teal-900 bg-opacity-50 p-4 rounded-md max-w-96 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]"
      >
        <label htmlFor="name" className="text-teal-50">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="p-2 rounded-md"
        />
        <label htmlFor="email" className="text-teal-50">
          Email
        </label>
        <input
          type="email"
          name="_replyto"
          id="email"
          required
          className=" p-2 rounded-md"
        />
        <label htmlFor="message" className="text-teal-50">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          required
          className=" p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-teal-500 text-teal-50 py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
