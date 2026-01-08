import Header from "./header/page";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Header/>
        {children}
    </div>
  );
}
