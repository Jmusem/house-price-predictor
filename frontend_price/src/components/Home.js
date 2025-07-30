import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Typewriter } from 'react-simple-typewriter';
import { FaBrain, FaMapMarkerAlt, FaSmile } from 'react-icons/fa';
import 'animate.css';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="py-5 text-white"
        style={{
          background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container className="text-center animate__animated animate__fadeIn">
          <h1 className="display-3 fw-bold mb-3">
            🏡 Nairobi House Price Predictor
          </h1>
          <h2 className="lead fs-3 text-warning mb-4">
            <Typewriter
              words={[
                'Smart. Simple. Local.',
                'AI-Driven Predictions.',
                'Accurate Nairobi Pricing.',
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h2>
          <Button variant="light" size="lg" href="/login" className="mt-2 px-5 shadow">
            Get Started
          </Button>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ background: '#f9fafc' }}>
        <Container>
          <h2 className="text-center mb-5 fw-bold">✨ Key Features</h2>
          <Row className="g-4">
            {[
              {
                title: 'AI-Powered Prediction',
                desc: 'Utilizes machine learning for fast and reliable house pricing.',
                icon: <FaBrain size={30} className="text-primary mb-3" />,
              },
              {
                title: 'Nairobi-Focused',
                desc: 'Tailored to Karen, Westlands, Lavington, and more.',
                icon: <FaMapMarkerAlt size={30} className="text-danger mb-3" />,
              },
              {
                title: 'User-Friendly',
                desc: 'Minimal steps. Maximum insights for all users.',
                icon: <FaSmile size={30} className="text-success mb-3" />,
              },
            ].map((feature, i) => (
              <Col md={4} key={i}>
                <Card
                  className="h-100 text-center p-3 border-0 shadow-sm hover-shadow"
                  style={{
                    borderRadius: '1rem',
                    background: '#ffffff',
                  }}
                >
                  <Card.Body>
                    {feature.icon}
                    <Card.Title className="fw-bold">{feature.title}</Card.Title>
                    <Card.Text>{feature.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Why Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src="https://source.unsplash.com/600x400/?modern,house,nairobi"
                alt="Nairobi House"
                className="img-fluid rounded shadow-sm"
              />
            </Col>
            <Col md={6} className="mt-4 mt-md-0">
              <h2 className="fw-bold mb-3">🏗️ Why Use This App?</h2>
              <p className="lead">
                Nairobi’s real estate market changes fast. Our AI tool keeps you updated with accurate price predictions based on the latest data.
              </p>
              <ul className="list-unstyled">
                <li>✅ Accurate and Reliable</li>
                <li>✅ Saves Time and Money</li>
                <li>✅ Easy for Buyers, Agents & Developers</li>
              </ul>
              <Button variant="outline-dark" size="md" href="/about" className="mt-2">
                Learn More
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section
        className="text-center py-5 text-white"
        style={{
          background: 'linear-gradient(90deg, #ff6a00, #ee0979)',
        }}
      >
        <Container>
          <h2 className="display-5 fw-semibold mb-3">🎯 Ready to Predict House Prices?</h2>
          <p className="lead mb-4">Start your journey with AI-powered insights — it's free!</p>
          <Button variant="light" size="lg" href="/register" className="px-5">
            Sign Up Now
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white text-center">
        <Container>
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Nairobi House AI &nbsp; | &nbsp; All rights reserved
          </p>
        </Container>
      </footer>
    </>
  );
};

export default Home;
