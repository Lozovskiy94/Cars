import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const DropdownActions = ({ car, onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedCar, setEditedCar] = useState({
    car_color: car.car_color,
    price: car.price,
    availability: car.availability
  });

  useEffect(() => {
    setEditedCar({
      car_color: car.car_color,
      price: car.price,
      availability: car.availability
    });
  }, [car]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleAction = (action) => {
    if (action === 'Delete') {
      openDeleteModal();
    } else if (action === 'Edit') {
      openEditModal();
    }
  };

  const handleDelete = () => {
    onDelete(car.id);
    closeDeleteModal();
  };

  const handleEdit = () => {
    const updatedPrice = !editedCar.price.includes('$') ? `$${editedCar.price}` : editedCar.price;

    onEdit(car.id, { ...editedCar, price: updatedPrice });
    closeEditModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'price') {
      const regex = /^(?:\$)?(?:\d+\.?\d*)$/;
  
      if (!value.match(regex)) {
        return;
      }
    } else if (name === 'availability') {
      const isAvailable = value === 'true';
  
      setEditedCar((prevCar) => ({
        ...prevCar,
        availability: isAvailable,
      }));
    } else {
      setEditedCar((prevCar) => ({
        ...prevCar,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this car?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCompany">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={car.car}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formModel">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={car.car_model}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formVIN">
              <Form.Label>VIN</Form.Label>
              <Form.Control
                type="text"
                name="vin"
                value={car.car_vin}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                name="year"
                value={car.car_model_year}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="car_color"
                value={editedCar.car_color}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={editedCar.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAvailability">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                as="select"
                name="availability"
                value={editedCar.availability}
                onChange={handleChange}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <DropdownButton id={`dropdown-actions-${car.car_id}`} title="Actions " show={isOpen} onToggle={toggleDropdown}>
        <Dropdown.Item onClick={() => handleAction('Edit')}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={() => handleAction('Delete')}>Delete</Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default DropdownActions;

