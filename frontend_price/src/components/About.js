// src/pages/About.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => (
  <Container className="my-5">
    <Row className="justify-content-center">
      <Col md={10}>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-4">
            <h2 className="text-center mb-4">About HousePredictor KE</h2>
            <p>
              At <strong>HousePredictor KE</strong>, we leverage the power of <strong>machine learning</strong> to deliver accurate and data-driven predictions of real estate prices in Nairobi, Kenya. Our goal is to bring clarity, transparency, and confidence to the housing market.
            </p>

            <h5 className="mt-4">Why Choose Us?</h5>
            <ul>
              <li>We analyze thousands of real estate listings to identify key pricing trends.</li>
              <li>Our models consider features such as location, bedrooms, bathrooms, and more.</li>
              <li>We aim to help buyers, sellers, and investors make smarter decisions.</li>
            </ul>

            <h5 className="mt-4">Our Mission</h5>
            <p>
              To make real estate pricing in Kenya more predictable and transparent by using advanced machine learning techniques and providing a user-friendly platform for both casual users and professional investors.
            </p>

            <h5 className="mt-4">Technology We Use</h5>
            <ul>
              <li>Python & Flask (Backend)</li>
              <li>React & Bootstrap (Frontend)</li>
              <li>Pandas, Scikit-learn, and CSV datasets for training</li>
            </ul>

            <h5 className="mt-4">Our Vision</h5>
            <p>
              Empowering property buyers and sellers in Kenya with accurate insights and future trends using data science.
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default About;
