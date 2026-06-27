export default function FooterSection() {
  return (
    <footer className="w-full border-t border-slate-900 flex items-center justify-center py-6">
      <p className="text-slate-500 text-xs font-mono">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-emerald-400">Jeremia Axelano</span>
        {" "}— Built with Next.js & Tailwind
      </p>
    </footer>
  );
}
