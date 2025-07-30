import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Spinner, Card, Row, Col } from 'react-bootstrap';
import { FaHome, FaBath, FaMapMarkerAlt, FaRedo, FaBuilding, FaHandshake } from 'react-icons/fa';

const Predict = () => {
  const [formData, setFormData] = useState({
    bedrooms: '',
    bathrooms: '',
    total_rooms: '',
    new_sub_county: '',
    property_type: '',
    purchase_type: ''
  });

  const [subCounties, setSubCounties] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const propertyTypes = ['House', 'Apartment'];
  const purchaseTypes = ['Sale', 'Rent'];

  useEffect(() => {
    const fetchSubCounties = async () => {
      try {
        const res = await fetch('http://localhost:5000/locations');
        const data = await res.json();
        if (data.subCounties) {
          setSubCounties(data.subCounties);
        } else {
          setError('Invalid location response');
        }
      } catch (err) {
        setError('Failed to load locations');
      }
    };

    fetchSubCounties();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      bedrooms: '',
      bathrooms: '',
      total_rooms: '',
      new_sub_county: '',
      property_type: '',
      purchase_type: ''
    });
    setPrediction(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setPrediction(null);

    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setPrediction(data.predicted_price);
      } else {
        setError(data.error || 'Prediction failed.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #f0f4f8, #d9e2ec)',
        padding: '80px 0',
        fontFamily: 'Segoe UI, sans-serif',
        minHeight: '100vh'
      }}
    >
      <Container style={{ maxWidth: '720px' }}>
        <Card className="shadow-lg border-0 rounded-4" style={{ overflow: 'hidden' }}>
          <Card.Body className="p-5">
            <h2 className="mb-4 text-center text-dark fw-bold">
              🏡 Nairobi Smart House Price Estimator
            </h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {prediction !== null && (
              <Alert variant="success" className="text-center fs-5 shadow-sm">
                🎉 Estimated Price: <strong>KES {Number(prediction).toLocaleString()}</strong>
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label><FaHome className="me-2 text-primary" />Bedrooms</Form.Label>
                  <Form.Control
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="e.g., 3"
                    min="1"
                    className="rounded-pill"
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label><FaBath className="me-2 text-primary" />Bathrooms</Form.Label>
                  <Form.Control
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="e.g., 2"
                    min="1"
                    className="rounded-pill"
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label><FaBuilding className="me-2 text-primary" />Property Type</Form.Label>
                  <Form.Select
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleChange}
                    className="rounded-pill"
                    required
                  >
                    <option value="">-- Select Property Type --</option>
                    {propertyTypes.map((type, idx) => (
                      <option key={idx} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Label><FaHandshake className="me-2 text-primary" />Purchase Type</Form.Label>
                  <Form.Select
                    name="purchase_type"
                    value={formData.purchase_type}
                    onChange={handleChange}
                    className="rounded-pill"
                    required
                  >
                    <option value="">-- Select Purchase Type --</option>
                    {purchaseTypes.map((type, idx) => (
                      <option key={idx} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Total Rooms</Form.Label>
                <Form.Control
                  type="number"
                  name="total_rooms"
                  value={formData.total_rooms}
                  onChange={handleChange}
                  placeholder="e.g., 10"
                  min="1"
                  className="rounded-pill"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label><FaMapMarkerAlt className="me-2 text-primary" />Sub-County</Form.Label>
                <Form.Select
                  name="new_sub_county"
                  value={formData.new_sub_county}
                  onChange={handleChange}
                  className="rounded-pill"
                  required
                >
                  <option value="">-- Select Sub-County --</option>
                  {subCounties.map((loc, index) => (
                    <option key={index} value={loc}>{loc}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Row>
                <Col xs={6}>
                  <Button
                    variant="outline-dark"
                    className="w-100 rounded-pill"
                    onClick={handleReset}
                  >
                    <FaRedo className="me-2" /> Reset
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 rounded-pill"
                    disabled={loading}
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Predict Price'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Predict;
