type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

const Section = ({ className, children }: SectionProps) => {
  return <section className={`py-16 ${className}`}>{children}</section>;
};

export default Section;
