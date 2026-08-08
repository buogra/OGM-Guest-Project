import { authConfig } from "./config";
import { girisYap } from "./api";

export function NextAuth(config: any) {
  return {
    handlers: {
      GET: async () => new Response("Auth Handler", { status: 200 }),
      POST: async () => new Response("Auth Handler", { status: 200 }),
    },
    auth: (handler?: any) => {
      if (typeof handler === "function") {
        return async (req: any, ctx: any) => {
          req.auth = null;
          return handler(req, ctx);
        };
      }
      return null;
    },
    signIn: async (provider?: string, options?: any) => {
      return { ok: true };
    },
    signOut: async () => {
      return { ok: true };
    },
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// Auth hook ve yardımcı fonksiyonlar
export { useAuth, kullaniciyiYaz, kullaniciyiOku, oturumuKapat } from "./useAuth";
export type { KullaniciBilgisi, AuthState } from "./useAuth";
