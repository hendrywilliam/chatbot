import Navbar from "@/components/layouts/navbar";
import ChatScreen from "@/components/chat-screen";

export default function IndexPage() {
    return (
        <main className="relative flex w-screen h-screen">
            <div className="flex flex-col flex-1">
                <Navbar />
                <ChatScreen />
            </div>
        </main>
    );
}
