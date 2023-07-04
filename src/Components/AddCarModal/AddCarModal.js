import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

const AddCarModal = ({ onAdd }) => {
  const initialCar = {
    id: uuidv4(),
    car: '',
    car_model: '',
    car_vin: '',
    car_model_year: '',
    car_color: '',
    price: '',
    availability: false 
  };

  const [showModal, setShowModal] = useState(false);
  const [newCar, setNewCar] = useState(initialCar);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleAdd = () => {
    // Проверка наличия всех обязательных полей
    if (newCar.car && newCar.car_model && newCar.car_vin && newCar.car_model_year && newCar.price) {
      const updatedCar = {
        ...newCar,
        price: newCar.price.startsWith('$') ? newCar.price : `$${newCar.price}`
      };
      onAdd(updatedCar);
      closeModal();
    }
  };

  const resetForm = () => {
    setNewCar(initialCar);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({
      ...prevCar,
      [name]: value
    }));
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9.]|(\.(?=.*\.))/g, '');
    setNewCar((prevCar) => ({
      ...prevCar,
      [name]: numericValue
    }));
  };

  const isFormValid = () => {
    return (
      newCar.car &&
      newCar.car_model &&
      newCar.car_vin &&
      newCar.car_model_year &&
      newCar.price
    );
  };

  return (
    <>
      <Button className='m-3' variant="primary" onClick={openModal}>
        Add car
      </Button>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCompany">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="car"
                value={newCar.car}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formModel">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="car_model"
                value={newCar.car_model}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formVIN">
              <Form.Label>VIN</Form.Label>
              <Form.Control
                type="text"
                name="car_vin"
                value={newCar.car_vin}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                name="car_model_year"
                value={newCar.car_model_year}
                onChange={handleNumericChange}
              />
            </Form.Group>
            <Form.Group controlId="formColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="car_color"
                value={newCar.car_color}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={newCar.price}
                onChange={handleNumericChange}
              />
            </Form.Group>
            <Form.Group controlId="formAvailability">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                as="select"
                name="availability"
                value={newCar.availability}
                onChange={handleInputChange}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd} disabled={!isFormValid()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCarModal;






// import React, { useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { v4 as uuidv4 } from 'uuid';

// const AddCarModal = ({ onAdd }) => {
//     const [showModal, setShowModal] = useState(false);
//     const [newCar, setNewCar] = useState({
//         id: uuidv4(),
//         car: '',
//         car_model: '',
//         car_vin: '',
//         car_model_year: '',
//         car_color: '',
//         price: '',
//         availability: false
//     });

//     const openModal = () => {
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//         resetForm();
//     };

//     const handleAdd = () => {
//         const updatedCar = {
//             ...newCar,
//             price: newCar.price.startsWith('$') ? newCar.price : `$${newCar.price}`
//         };
//         onAdd(updatedCar);
//         closeModal();
//     };

//     const resetForm = () => {
//         setNewCar({
//             id: uuidv4(),
//             car: '',
//             car_model: '',
//             car_vin: '',
//             car_model_year: '',
//             car_color: '',
//             price: '',
//             availability: false
//         });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setNewCar((prevCar) => ({
//             ...prevCar,
//             [name]: value
//         }));
//     };

//     const handleNumericChangePrice = (e) => {
//         const { name, value } = e.target;
//         const numericValue = value.replace(/[^0-9.]|(\.(?=.*\.))/g, '');
//         setNewCar((prevCar) => ({
//             ...prevCar,
//             [name]: numericValue
//         }));
//     };

//     const handleNumericChangeYear = (e) => {
//         const { name, value } = e.target;
//         const numericValue = value.replace(/[^0-9]/g, '');
//         setNewCar((prevCar) => ({
//             ...prevCar,
//             [name]: numericValue
//         }));
//     };

//     return (
//         <>
//             <Button className='m-3' variant="primary" onClick={openModal}>
//                 Add car
//             </Button>

//             <Modal show={showModal} onHide={closeModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add car</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group controlId="formCompany">
//                             <Form.Label>Company</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="car"
//                                 value={newCar.car}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formModel">
//                             <Form.Label>Model</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="car_model"
//                                 value={newCar.car_model}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formVIN">
//                             <Form.Label>VIN</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="car_vin"
//                                 value={newCar.car_vin}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formYear">
//                             <Form.Label>Year</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="car_model_year"
//                                 value={newCar.car_model_year}
//                                 onChange={handleNumericChangeYear}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formColor">
//                             <Form.Label>Color</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="car_color"
//                                 value={newCar.car_color}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formPrice">
//                             <Form.Label>Price</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="price"
//                                 value={newCar.price}
//                                 onChange={handleNumericChangePrice}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formAvailability">
//                             <Form.Label>Availability</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 name="availability"
//                                 value={newCar.availability}
//                                 onChange={handleChange}
//                             >
//                                 <option value={true}>Yes</option>
//                                 <option value={false}>No</option>
//                             </Form.Control>
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={closeModal}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleAdd}>
//                         Add
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// };

// export default AddCarModal;







