export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto flex justify-between items-center px-6">
        <p>&copy; 2024 Rhombusai. All rights reserved.</p>
        <div className="space-x-4">
          <a
            href="https://twitter.com"
            className="hover:text-yellow-400 transition"
          >
            Twitter
          </a>
          <a
            href="https://github.com"
            className="hover:text-yellow-400 transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
