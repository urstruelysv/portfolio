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
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </>
  );
}
