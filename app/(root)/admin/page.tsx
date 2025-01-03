import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Admin`,
  description: "Modern Ecommerce platform",
};


const Adminpage = () => {
  return ( <>
<Button>Sign In</Button>
  </> );
}
 
export default Adminpage;