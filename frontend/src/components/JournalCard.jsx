import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { updateJournal, deleteJournal } from '../services/api';
import toast from 'react-hot-toast';

const moods = ['happy', 'sad', 'neutral', 'angry', 'excited'];

const JournalCard = ({ journal, onUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: journal.title,
    content: journal.content,
    mood: journal.mood
  });

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteClick = async () => {
    try {
      await deleteJournal(journal._id);
      toast.success('Journal deleted successfully');
      onUpdate();
    } catch (error) {
      toast.error('Error deleting journal');
      console.error('Error:', error);
    }
    handleMenuClose();
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateJournal(journal._id, editFormData);
      toast.success('Journal updated successfully');
      onUpdate();
      setEditDialogOpen(false);
    } catch (error) {
      toast.error('Error updating journal');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Card 
        className="journal-card" 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%',
          margin: '0 auto',
          px: { xs: 2, sm: 3, md: 4 },
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
          }
        }}
      >
        <CardContent sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          padding: '24px !important',
          width: '100%'
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            position: 'relative',
            mb: 2,
            pt: 1
          }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                fontSize: '1.5rem',
                textAlign: 'center'
              }}
            >
              {journal.title}
            </Typography>
            <IconButton 
              onClick={handleMenuOpen}
              sx={{ 
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                '&:hover': { 
                  backgroundColor: 'rgba(99, 102, 241, 0.1)' 
                }
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <div className={`mood-indicator mood-${journal.mood}`}>
              {journal.mood.charAt(0).toUpperCase() + journal.mood.slice(1)}
            </div>
          </Box>

          <Typography 
            variant="body1" 
            sx={{ 
              color: 'var(--text-secondary)',
              mb: 3,
              lineHeight: 1.7,
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto',
              flex: 1,
              fontSize: '1rem'
            }}
          >
            {journal.content}
          </Typography>

          {journal.aiInsight && (
            <Box className="ai-insight" sx={{ mt: 'auto' }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: 'var(--primary-color)',
                  fontWeight: 'bold',
                  mb: 1,
                  textAlign: 'center'
                }}
              >
                AI Insight
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  textAlign: 'center'
                }}
              >
                {journal.aiInsight}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Journal Entry</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={editFormData.title}
              onChange={handleEditChange}
              required
            />
            <TextField
              margin="dense"
              name="content"
              label="Content"
              multiline
              rows={4}
              fullWidth
              value={editFormData.content}
              onChange={handleEditChange}
              required
            />
            <TextField
              select
              margin="dense"
              name="mood"
              label="Mood"
              fullWidth
              value={editFormData.mood}
              onChange={handleEditChange}
            >
              {moods.map((mood) => (
                <MenuItem key={mood} value={mood}>
                  {mood}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default JournalCard;