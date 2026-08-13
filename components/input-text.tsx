import { Loader, Send } from 'lucide-react';
import Image from 'next/image'

export default function InputText({ submitQuery, loading, query, setQuery, messagesSize }: {
    submitQuery: () => void,
    loading: boolean,
    query: string,
    setQuery: (query: string) => void,
    messagesSize: number
}
) {

    return (
        <div
            className="w-full max-w-3xl mx-auto flex items-center gap-2 rounded-full bg-black/20 border border-white/50 px-2 py-3 shadow-sm m-2 h-14 fixed bottom-5">
            <a href="https://mohanmoku.vercel.app" target="_blank" className="w-[clamp(20px,8vw,40px)] aspect-square rounded-full overflow-hidden">
                <Image
                    src="/image.png"
                    alt="Image"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                />
            </a>
            <div className="flex-1 text-white rounded-2xl p-3">

                {messagesSize < 30 ?
                    <input
                        type="text"
                        placeholder="I'm moku.ai"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !loading) {
                                submitQuery();
                            }
                        }}
                        className="w-full border-none bg-transparent outline-none focus:outline-none focus:ring-0 text-xl"
                    /> :
                    <input
                        type="text"
                        value="Session Is Too Long, Refresh To Know more."
                        disabled
                        className="w-full border-none bg-transparent outline-none focus:outline-none focus:ring-0 text-xl"
                    />
                }


            </div>

            <div onClick={submitQuery} className="h-9 w-9 rounded-full flex items-center">
                {loading ? <Loader size={25} className="animate-spin" /> : <Send size={25} />}
            </div>
        </div>
    )
}
