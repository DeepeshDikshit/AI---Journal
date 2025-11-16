import { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import { login, register } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await (isLogin ? login(formData) : register(formData));
      authLogin(response.data);
      toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
      navigate('/journals');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box className="auth-container">
      <Paper elevation={3} className="auth-paper">
        <Typography className="auth-title">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </Typography>
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          className="auth-form"
        >
          {!isLogin && (
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              placeholder="Enter your name"
            />
          )}
          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            placeholder="Enter your email"
          />
          <TextField
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            placeholder="Enter your password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="auth-button"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
          <Button
            fullWidth
            onClick={() => setIsLogin(!isLogin)}
            className="auth-link"
          >
            {isLogin ? 
              "Don't have an account? Register" : 
              'Already have an account? Login'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Auth;