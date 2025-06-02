import Head from "next/head";

interface ContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Container({
  children,
  title,
  description,
}: ContainerProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
