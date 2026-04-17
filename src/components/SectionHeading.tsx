type SectionHeadingProps = {
  title: string;
  copy?: string;
  className?: string;
};

export default function SectionHeading({ title, copy, className = "" }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${className}`.trim()}>
      <h2>{title}</h2>
      {copy ? <p className="section-heading__copy">{copy}</p> : null}
    </div>
  );
}
