interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
  hover?: boolean;
}

const Card = ({
  children,
  className = "",
  title,
  subtitle,
  footer,
  onClick,
  hover = false,
}: CardProps) => {
  const baseClasses = "bg-white rounded-lg shadow-md border border-gray-200";
  const hoverClasses = hover
    ? "hover:shadow-lg hover:scale-105 transition-all duration-200"
    : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Content */}
      <div className="px-6 py-4">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
