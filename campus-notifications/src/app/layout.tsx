import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Campus Notifications",
  description:
    "Stay updated with the latest campus events, results, and placement notifications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
      </head>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
