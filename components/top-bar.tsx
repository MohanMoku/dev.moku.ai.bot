import Image from 'next/image'
import { Orbitron } from "next/font/google";
const orbitron = Orbitron({
    subsets: ["latin"],
});

export default function TopBar() {

    return (
        <div className="fixed top-0 left-0 z-50 w-full flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 py-3">
            <h1 className={`${orbitron.className} text-base sm:text-lg md:text-xl font-semibold tracking-wide text-white`}>dev-moku-ai</h1>
            <a href='https://mohanmoku.vercel.app' target='_blank' className="w-[clamp(30px,10vw,60px)] aspect-square rounded-full overflow-hidden">
                <Image
                    src="/image.png"
                    alt="Image"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                />
            </a>


        </div>
    )
}