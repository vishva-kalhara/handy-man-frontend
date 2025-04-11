import Protected from "@/contexts/protected-provider";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
    return <Protected>{children}</Protected>;
};

export default Layout;
