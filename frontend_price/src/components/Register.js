// src/pages/Register.js
import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.status === 201) {
      setSuccess(data.message);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      alert(data.error || 'Registration failed');
    }
  } catch (err) {
    alert('An error occurred. Try again.');
  }
};

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: 400 }}>
        <h3 className="text-center mb-3">Register</h3>
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full name"
              name="name"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">
            Register
          </Button>
          <div className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
