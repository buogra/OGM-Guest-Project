import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        console.log("Authorize çalıştı, credentials:", credentials);
        // Hata ayıklama için geçici olarak tüm girişleri kabul ediyoruz.
        return { 
          id: "1", 
          name: (credentials?.username as string) || "Test User", 
          email: "test@ogm.gov.tr", 
          role: "ADMIN" 
        };
      }
    })
  ],
  pages: {
    signIn: "/resepsiyon/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET || "ogm-misafirhane-super-secret-key-12345",
});
