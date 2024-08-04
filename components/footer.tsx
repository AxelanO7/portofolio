import React from "react";

export default function FooterSection() {
  return (
    <footer className="w-full flex items-center justify-center py-3">
      <p className="text-default-600">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-teal-500">Jeremia Axelano</span>
      </p>
    </footer>
  );
}
