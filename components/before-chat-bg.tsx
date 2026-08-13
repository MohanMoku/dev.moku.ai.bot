import { KineticText } from "./ui/kinetic-text";

export default function BeforeChatBg() {
    return (
        <>
            <div className="mx-auto w-full max-w-5xl px-5 text-center sm:px-6">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 sm:mb-6 sm:text-sm sm:tracking-[0.25em]">
                    Meet Moku.AI
                </p>
                <h1 className="text-4xl font-semibold leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                    Skip the resume.
                </h1>
                <span className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-1 text-base leading-relaxed text-neutral-400 sm:mt-6 sm:text-xl md:text-2xl">
                    <span>Get to know</span>
                    <KineticText
                        text="MOHAN"
                        className="text-4xl font-medium leading-none tracking-tight text-neutral-200 sm:text-5xl md:text-6xl lg:text-7xl"
                    />
                    <span>through conversation.</span>
                </span>
            </div>
        </>
    )
}
