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
            <button onClick={handleDelete} className="delete-btn">Hapus</button>
        </div>
    );
}

export default NoteCard;
