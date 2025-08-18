function Title({ children, className }) {
  return (
    <h1 className={`text-3xl font-bold mb-2 ${className}`}>
      {children}
    </h1>
  );
}

export default Title;
