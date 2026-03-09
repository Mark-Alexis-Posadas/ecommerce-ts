type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={`max-w-7xl mx-auto px-6 ${className}`}>{children}</div>
  );
};

export default Container;
