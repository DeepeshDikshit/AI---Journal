import { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Button, Typography, Box, AppBar, Toolbar } from '@mui/material';
import toast from 'react-hot-toast';
import JournalCard from './JournalCard';
import JournalForm from './JournalForm';
import { getJournals } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchJournals = useCallback(async () => {
    try {
      if (!user?.user?.id) {
        console.error('User ID not found');
        return;
      }
      const response = await getJournals(user.user.id);
      setJournals(response.data);
    } catch (error) {
      console.error('Error fetching journals:', error);
      toast.error('Failed to fetch journals');
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchJournals();
  }, [user, navigate, fetchJournals]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <AppBar position="fixed" elevation={0} className="journals-header">
        <Container maxWidth="lg">
          <Toolbar sx={{ px: { xs: 0 } }}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              AI Journal
            </Typography>
            <Button 
              color="inherit" 
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          pt: '64px', // Height of AppBar
          backgroundColor: '#f8fafc'
        }}
      >
      <Container maxWidth={false} sx={{ 
          mt: 4, 
          mb: 4, 
          px: { xs: 2, sm: 4, md: 6, lg: 8 }
        }}>
        <Box sx={{ 
          mb: 4, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          width: '100%'
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center'
            }}
          >
            Your Journals
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setIsFormOpen(true)}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }
            }}
          >
            New Journal
          </Button>
        </Box>
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'center',
            width: '100%'
          }}
        >
          {journals.map((journal) => (
            <Grid item xs={12} key={journal._id}>
              <Box sx={{ height: '100%' }}>
                <JournalCard 
                  journal={journal} 
                  onUpdate={fetchJournals}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      </Box>
      <JournalForm 
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmitSuccess={fetchJournals}
        userId={user?.user?.id}
      />
    </Box>
  );
};

export default Journals;