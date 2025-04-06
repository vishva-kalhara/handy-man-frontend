import Link from "next/link";
import { UrlObject } from "url";
import { Label } from "./ui/label";

type Props = {
    href: string | UrlObject;
    text: string;
};

const BlueLink = ({ href, text }: Props) => {
    return (
        <Link href={href} className="text-blue-500 py-1 hover:text-blue-600">
            <Label className="hover:cursor-pointer">{text}</Label>
        </Link>
    );
};

export default BlueLink;
