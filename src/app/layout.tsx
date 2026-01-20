// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { ThemeProvider } from "@/providers/theme-provider"
// import { DesignProvider } from "@/context/design-context"
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "AfroQueens - Amplifying African Female Voices",
//   description: "Elevating African female musical talent through mentorship, collaboration, and global exposure.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <DesignProvider>
//             {children}
//           </DesignProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/providers/theme-provider"
import { DesignProvider } from "@/context/design-context"
import { Providers } from "./providers"
import { auth } from "@/lib/auth"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AfroQueens - Amplifying African Female Voices",
  description: "Elevating African female musical talent through mentorship, collaboration, and global exposure.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DesignProvider>
              {children}
            </DesignProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}