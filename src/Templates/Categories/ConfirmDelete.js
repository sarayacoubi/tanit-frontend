const ConfirmDelete = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirmOverlay">
      <div className="confirmModal">
        <div className="confirmIcon">!</div>

        <h2>Confirmer la suppression</h2>

        <p>
          Êtes-vous sûre de vouloir supprimer cette catégorie ? Cette action est
          irréversible.
        </p>

        <div className="confirmActions">
          <button type="button" className="cancelBtn" onClick={onCancel}>
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
