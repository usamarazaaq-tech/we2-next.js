import { FileTransferCard } from "@/components/file-transfer-card"

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 p-4 flex items-center justify-center">
      <FileTransferCard />
    </div>
  );
}
