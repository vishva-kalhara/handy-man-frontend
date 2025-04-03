import BlackLogo from "./assets/BlackLogo";
import FooterLogo from "./assets/FooterLogo";

const Footer = () => {
    return (
        <div className="w-full p-6">
            <div className="w-full border-t border-t-black/10 mx-auto flex flex-col md:flex-row md:justify-between relative pt-16 gap-10 md:gap-0">
                <div className="hidden md:block">
                    <FooterLogo />
                </div>
                <div className="md:hidden flex justify-center">
                    <BlackLogo color="black" />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-center md:text-end text-black/80 text-sm">
                        Designed &amp; Developed by <br />{" "}
                        <span className="font-semibold">Wishva Kalhara</span>
                    </p>
                    <p className="text-black/60 text-center md:text-end text-sm">
                        &copy; 2025
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
