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
        // FRONTEND TEST İÇİN GEÇİCİ KONTROL: Herhangi bir giriş kabul edilecek.
        // Backend bağlandığında gerçek API kontrolü yapılacak.
        if (credentials?.username && credentials?.password) {
          return { id: "1", name: credentials.username as string, email: `${credentials.username}@ogm.gov.tr`, role: "ADMIN" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/resepsiyon/login", // Resepsiyon görevlisi giriş sayfası
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
  secret: process.env.AUTH_SECRET || "ogm-misafirhane-super-secret-key-12345",
});
