import { AI_NAME } from "@/features/theme/theme-config";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { Toaster } from "@/features/ui/toaster";
import { cn } from "@/ui/lib";
// import { Inter } from "next/font/google"; // Temporarily disabled due to DNS block
import { StencilLoader } from "@/components/StencilLoader";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] }); // Temporarily disabled

export const metadata = {
  title: AI_NAME,
  description: AI_NAME,
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full overflow-hidden text-sm">
      <body
        className={cn("font-inter h-full w-full flex bg-background")} // Using CSS font-family instead
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <StencilLoader>
            {children}
          </StencilLoader>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
