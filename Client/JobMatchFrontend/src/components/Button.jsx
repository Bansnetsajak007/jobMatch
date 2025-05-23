const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-secondary text-white px-6 py-2 rounded-lg hover:bg-primary transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;