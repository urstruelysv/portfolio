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
  return <div className="w-full">{children}</div>;
}
