export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold text-yellow-400">Rhombusai</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:text-yellow-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
