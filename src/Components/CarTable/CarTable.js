import React, { useState, useEffect } from 'react';
import CarsService from '../../Services/CarsService';
import Table from 'react-bootstrap/Table';
import CarPagination from '../CarPagination/CarPagination';
import DropdownActions from '../DropdownActions/DropdownActions';
import AddCarModal from '../AddCarModal/AddCarModal';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const CarTable = () => {
  const carsService = new CarsService();

  const [cars, setCars] = useState([]);

  useEffect(() => {
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
      setCars(JSON.parse(storedCars));
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const data = await carsService.getAllCars();
      setCars(data.cars);
      localStorage.setItem('cars', JSON.stringify(data.cars));
    } catch (error) {
      console.log(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredCars = cars.filter((car) => {
    const searchRegex = new RegExp(searchTerm, 'i');
    return (
      searchRegex.test(car.car) ||
      searchRegex.test(car.car_model) ||
      searchRegex.test(car.car_vin) ||
      searchRegex.test(car.car_color) ||
      searchRegex.test(car.car_model_year.toString()) ||
      searchRegex.test(car.price.toString()) ||
      (car.availability && searchRegex.test('Да')) ||
      (!car.availability && searchRegex.test('Нет'))
    );
  });

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = (carId) => {
    const updatedCars = cars.filter((car) => car.id !== carId);
    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
  };

  const handleEdit = (carId, editedCar) => {
    const updatedCars = cars.map((car) => {
      if (car.id === carId) {
        return { ...car, ...editedCar };
      }
      return car;
    });

    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
  };

  const handleAddCar = (newCar) => {
    setCars([newCar, ...cars]);
    localStorage.setItem('cars', JSON.stringify([newCar, ...cars]));
  };

  return (
    <Container fluid className="mt-5 d-flex flex-column">
      <Form.Control
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <AddCarModal onAdd={handleAddCar} />

      <Table striped size="sm" bordered hover variant="dark">
        <thead>
          <tr>
            <th>Company</th>
            <th>Model</th>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((car, index) => (
            <tr key={index}>
              <td>{car.car}</td>
              <td>{car.car_model}</td>
              <td>{car.car_vin}</td>
              <td>{car.car_color}</td>
              <td>{car.car_model_year}</td>
              <td>{car.price}</td>
              <td>{car.availability ? 'Yes' : 'No'}</td>
              <td>
                <DropdownActions car={car} onDelete={handleDelete} onEdit={handleEdit} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CarPagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
};

export default CarTable;








