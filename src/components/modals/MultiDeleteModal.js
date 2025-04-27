import { buttonClass } from "@/classes/button";
import { textClass } from "@/classes/text";
import { summonToast } from "@/helpers/summonToast";
import { multiDelete } from "@/requests/multiDelete";
import useModalStore from "@/store/modalSrore";
import useTrackStore from "@/store/tracksStore";

export default function MultiDeleteModal({ defaults }) {
  const closeModal = useModalStore((state) => state.closeModal);
  const list = useTrackStore((state) => state.tracks);
  const setTrackList = useTrackStore((state) => state.setTracks);
  const setLoading = useTrackStore((state) => state.setLoading);

  const handleDelete = async () => {
    setLoading(true);
    summonToast(multiDelete, [defaults], {
      loading: "Deleting tracks...",
      success: "Tracks deleted",
    })
      .then(({ success }) => {
        const remaining = list.filter(
          (track) => !success.some((del) => del === track.id)
        );
        setTrackList(remaining);
      })
      .finally(() => {
        setLoading(false);
      });
    closeModal();
  };

  return (
    <div data-testid="confirm-dialog">
      <h3 className={`${textClass}`}>
        Are you sure that you wanna delete all these tracks?
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
