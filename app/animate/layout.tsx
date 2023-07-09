import { ReactNode } from "react";
import Link from "next/link";

export default function Layout({
    children
}: { children: ReactNode}){
    return (
        <div>
            <Link href={"/"}>homeへ</Link>
            <hr />
            {children}
        </div>
    )
}