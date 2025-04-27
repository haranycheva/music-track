import ModalWrapper from "@/components/modals/ModalWrapper";
import MyToaster from "@/components/MyToaster";
import TopPart from "@/components/tracks/TopPart";
import Tracks from "@/components/tracks/Tracks";

export default function TracksPage() {
  return (
    <main>
        <MyToaster />
      <section className="track-manager py-8">
        <div className="container mx-auto px-8">
          <TopPart />
          <Tracks />
        </div>
      </section>
      <ModalWrapper />
    </main>
  );
}
