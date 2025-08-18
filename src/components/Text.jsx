function Text({ children, className }) {
  return (
    <p className={`text-sm font-light text-gray-600 mb-4 ${className}`}>
      {children}
    </p>
  );
}

export default Text;
