import { buttonClass } from "@/classes/button";
import { textClass } from "@/classes/text";
import { summonToast } from "@/helpers/summonToast";
import { deleteTrack } from "@/requests/deleteTrack";
import useModalStore from "@/store/modalSrore";
import useTrackStore from "@/store/tracksStore";

export default function DeleteTrackModal({ defaults }) {
  const closeModal = useModalStore((state) => state.closeModal);
  const list = useTrackStore((state) => state.tracks);
  const setTrackList = useTrackStore((state) => state.setTracks);
  const setLoading = useTrackStore((state) => state.setLoading);

  const handleDelete = async () => {
    const { id } = defaults;
    setLoading(true);
    summonToast(deleteTrack, [id], {
      loading: "Deleting track...",
      success: "Track deleted",
    })
      .then(() => {
        setTrackList(list.filter((el) => id != el.id));
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
    closeModal();
  };

  return (
    <div data-testid="confirm-dialog">
      <h3 className={`${textClass}`}>
        Are you sure that you wanna delete this track?
      </h3>
      <ul className="flex mt-15 gap-10">
        <li>
          <button
            className={`${buttonClass}`}
            onClick={handleDelete}
            type="button"
            data-testid="confirm-delete"
          >
            Delete
          </button>
        </li>
        <li>
          <button
            className={`${buttonClass}`}
            onClick={closeModal}
            type="button"
            data-testid="cancel-delete"
          >
            Cancel
          </button>
        </li>
      </ul>
    </div>
  );
}
