import { HackerLoader } from "@/components/ui/hacker-loader"

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <HackerLoader text="INITIALIZING_SYSTEM" className="text-xl" />
        </div>
    )
}
