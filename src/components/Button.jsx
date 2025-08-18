function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white py-2 rounded w-32 hover:bg-gray-600 mt-2 mb-2 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
