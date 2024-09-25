export {default} from "next-auth/middleware"

// Define which paths the middleware should apply to
export const config = {
  
     matcher: ["/board/:path*"], // Adjust paths as needed
};
