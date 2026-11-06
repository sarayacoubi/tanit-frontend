
import "./ConfirmDelete.css";

const ConfirmDelete = ({
  isOpen,
  title = "Confirmer la suppression",
  message = "Voulez-vous vraiment supprimer cet élément ? Cette action est irréversible.",
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="deleteOverlay">
      <div
        className="deleteModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deleteTitle"
      >
        <i className="ri-error-warning-line deleteWarningIcon"></i>

        <h3 id="deleteTitle">{title}</h3>

        <p>{message}</p>

        <div className="deleteModalActions">
          <button
            type="button"
            className="cancelDeleteBtn"
            onClick={onCancel}
          >
            Annuler
          </button>

          <button
            type="button"
            className="confirmDeleteBtn"
            onClick={onConfirm}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
