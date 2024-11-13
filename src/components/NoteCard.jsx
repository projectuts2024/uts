function NoteCard({ id, title, content, createdAt, onDelete }) {
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this note?');
        if (confirmDelete) {
            await onDelete(id);
        }
    };

    return (
        <div className="note-card">
            <div className="note-title">{title}</div>
            <div className="note-content">{content}</div>
            <div className="note-date">{new Date(createdAt).toLocaleString()}</div>
            <div className="note-actions">
                <i
                    className="fas fa-trash-alt delete-icon"
                    onClick={handleDelete}
                ></i>
            </div>
        </div>
    );
}

export default NoteCard;
