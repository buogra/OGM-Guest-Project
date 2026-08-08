export interface NextAuthConfig {
  pages?: {
    signIn?: string;
  };
  session?: {
    strategy?: string;
    maxAge?: number;
  };
  callbacks?: {
    jwt?: (params: { token: any; user?: any }) => any;
    session?: (params: { session: any; token: any }) => any;
  };
  providers?: any[];
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/giris",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8, // 8 saat
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.rol = user.rol;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    session({ session, token }) {
      if (session?.user) {
        session.user.rol = token.rol;
      }
      if (session) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  providers: [],
};
