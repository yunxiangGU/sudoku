import "./globals.css";
import "@shoelace-style/shoelace/dist/themes/light.css";

export const metadata = {
  title: "Sudoku",
  description: "Sudoku",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
