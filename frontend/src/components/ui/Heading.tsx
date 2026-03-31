type HeadingProps = {
  title: string;
  className?: string;
};

export default function Heading({ title, className = "" }: HeadingProps) {
  return (
    <div
      className={`bg-[#423C3C] text-[#E9E1D4] border-[3px] border-[#201E1F]
      shadow-[4px_4px_0px_#201E1F] text-center py-3 ${className}`}
    >
      <h1 className="text-[14px] tracking-widest">
        {title}
      </h1>
    </div>
  )
}