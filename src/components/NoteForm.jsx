import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import '../styles/NoteForm.css';
import '../styles/NoteCard.css';
import NoteCard from './NoteCard';

function NoteForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            console.log('Title and Content must not be empty');
            return;
        }

        const { data, error } = await supabase.from('notes').insert([
            { title, content }
        ]);

        if (error) {
            console.error('Error:', error);
            alert('Failed to add note. Please try again.');
        } else {
            if (data && data.length > 0) {
                setNotes((prevNotes) => [data[0], ...prevNotes]);
            } else {
                console.error('No data returned after insert');
            }
        }

        setTitle('');
        setContent('');
    };

    const handleDelete = async (id) => {
        const { error } = await supabase.from('notes').delete().eq('id', id);

        if (error) {
            console.error('Error deleting note:', error);
            alert('Failed to delete note. Please try again.');
        } else {
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('notes').select('*').order('created_ats', { ascending: false });
            if (error) {
                console.error('Error fetching notes:', error);
            } else {
                setNotes(data); 
            }
        };

        const channel = supabase.channel('notes-channel');
        const subscription = channel
            .on('postgres_changes', { schema: 'public', table: 'notes' }, (payload) => {
                const { event } = payload;
                setNotes((prevNotes) => {
                    switch (event) {
                        case 'INSERT':
                            return [payload.new, ...prevNotes];
                        case 'UPDATE':
                            return prevNotes.map((note) =>
                                note.id === payload.new.id ? payload.new : note
                            );
                        case 'DELETE':
                            return prevNotes.filter((note) => note.id !== payload.old.id);
                        default:
                            return prevNotes;
                    }
                });
            })
            .subscribe();

        fetchData(); 

        return () => {
            channel.unsubscribe();  
        };
    }, []);  
        return (
            <div className="container">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <button type="submit">Tambah Cerita Boy</button>
                    </form>
                </div>

                <div className="notes-container">
                    {notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            content={note.content}
                            createdAt={note.created_ats}
                            onDelete={handleDelete} 
                        />
                    ))}
                </div>
            </div>
        );

}
export default NoteForm;
