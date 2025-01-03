import { APP_NAME } from "@/lib/constants";


const Footer = () => {

    const CURRENT_YEAR = new Date().getFullYear()

    return ( 
        <footer className="border-t">
            <div className="p-5 flex-center">
                {CURRENT_YEAR} {APP_NAME}. All Rights Reserved
            </div>
        </footer>
     )
}
 
export default Footer;