import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  MenuItem 
} from '@mui/material';
import { createJournal } from '../services/api';
import toast from 'react-hot-toast';

const moods = ['happy', 'sad', 'neutral', 'angry', 'excited'];

const JournalForm = ({ open, onClose, onSubmitSuccess, userId }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: 'neutral'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJournal({ ...formData, userId });
      toast.success('Journal created successfully!');
      onSubmitSuccess();
      onClose();
      setFormData({ title: '', content: '', mood: 'neutral' });
    } catch (error) {
      toast.error('Error creating journal');
      console.error('Error:', error);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'var(--text-primary)',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          pb: 2
        }}
      >
        New Journal Entry
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{
              sx: {
                borderRadius: 2
              }
            }}
          />
          <TextField
            margin="dense"
            name="content"
            label="What's on your mind?"
            multiline
            rows={6}
            fullWidth
            value={formData.content}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{
              sx: {
                borderRadius: 2
              }
            }}
          />
          <TextField
            select
            margin="dense"
            name="mood"
            label="How are you feeling?"
            fullWidth
            value={formData.mood}
            onChange={handleChange}
            InputProps={{
              sx: {
                borderRadius: 2
              }
            }}
          >
            {moods.map((mood) => (
              <MenuItem 
                key={mood} 
                value={mood}
                sx={{
                  textTransform: 'capitalize'
                }}
              >
                {mood}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={onClose}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 3,
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }
            }}
          >
            Create Journal
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default JournalForm;