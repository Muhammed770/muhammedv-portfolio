import Link from "next/link";
import { links } from "@/data/resume";
export interface LinkItems {
    href: string;
    name: string;
}

const Navbar = () => {
    return ( 
        <nav className="flex items-center justify-center mt-4 ">
            <div className="max-w-xl flex w-full justify-end gap-x-4 text-lg font-[family-name:var(--font-manrope-semi-bold)] tracking-tighter">
                {links.map((link,i)=>(
                    <Link href={link.href} key={i} className="hover:underline ">
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
     );
}
 
export default Navbar;