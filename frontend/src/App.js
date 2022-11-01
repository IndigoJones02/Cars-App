import React, { useState } from 'react';
import './App.css';

function Cars() {
/**
 * Fields required for the car
      "id",
      "brand",
      "name",
      "releaseYear",
      "color"
 */
  const carFormInitialData = {
    id: 0,
    name: '',
    brand: '',
    releaseYear: 0,
    color: ''
  }
  const [carFormData, setCarFormData] = useState(carFormInitialData);
  const [data,setData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarFormData({
      ...carFormData,
      [name]: value,
    });
  }

  useEffect(() =>{
    fetch('https://localhost:3002/get_car')
      .then(resp => resp.json())
      .then(results => setData(results));

  }, [data]);
  const handleSubmit = (event) => {
    /**
     * Gather all the form data to state variable carFormData
     * When the form is submitted POST the data to Backend using fetch post
     * https://googlechrome.github.io/samples/fetch-api/fetch-post.html
     */

    event.preventDefault();

    fetch('https://localhost:3002/create', {
      methood: 'POST',
      body: JSON.stringify({
        id: carFormData.id,
        name: carFormData.name,
        brand: carFormData.brand,
        releaseYear: carFormData.releaseYear,
        color: carFormData.color
      }),
        headers: { 'Content-Type': 'applications/json'},
    }).then(resp => resp.json()
      .then(results => setData(results)));
      setCarFormData(carFormInitialData);
  }

  const handleDelete = (carId) => {
    /**
     * When clicked on a delete button, get the id of the car's delete button clicked
     * Then use javascript fetch to send DELETE request to NodeJS
     * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
     */
        fetch('https://localhost:3002/delete_car', {
        method: "DELETE",
        body: JSON.stringify({id: carId}),
        headers: { 'Content-type': 'application/json' }
    })
        .then(res => {
            if (res.ok) { console.log("HTTP request successful") }
            else { console.log("HTTP request unsuccessful") }
            return res
        })
        .then(res => res.json())
        .then(data => setData(data))
        .catch(error => console.log(error))
  
  }

/** 🥳🥳🥳🥳🥳🥳 DOUBLE BONUS POINTS 🥳🥳🥳🥳🥳🥳 */
  const handleEdit = () => {
    /**
     * When clicked on a edit button figure out a way to edit the car data.
     * Once edited send the updated data to NodeJS.
     * Then use javascript fetch to send DELETE request to NodeJS
     * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
     */
  }
 
  return (
    <div className='cars-from-wrapper'>
      <form id="cars-form" onSubmit={handleSubmit} autoComplete="off">
        {/** 
           * TODO: Update the form fields with inputs for 
           *    ID, Brand, Name, ReleaseYear and Color
           * Make required changes to  const carFormInitialData
           * */}  
        <label>
          ID:
          <input name='id' type="text" value={carFormData.id} onChange={handleInputChange} />
        </label>
        <label>
          Name:
          <input name='name' type="text" value={carFormData.name} onChange={handleInputChange} />
        </label>
        <label>
         Brand:
          <input name='brand' type="text" value={carFormData.brand} onChange={handleInputChange} />
        </label>
        <label>
          Release Year:
          <input name='releaseYear' type="text" value={carFormData.releaseYear} onChange={handleInputChange} />
        </label>
        <label>
         Color:
          <input name='color' type="text" value={carFormData.color} onChange={handleInputChange} />
        </label>
        <input type="submit" value="Submit" onClick={(e) => handleSubmit(e)} />
      </form>
       {/** 
           * TODO: Update the code below to see any new proprties added to carFormData
           * */}  
      <p>ID: {carFormData.id}, Car Model: {carFormData.name}, Car Make: {carFormData.brand}, Release Year: {carFormData.releaseYear}, Color: {carFormData.color}</p>

      <h2>Cars Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Model</th>
            <th>Car Make</th>
            <th>Release Year</th>
            <th>Color</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/** 
           * TODO: Replace this code with Data from Node JS GET api data
           * React documentation: https://reactjs.org/docs/lists-and-keys.html
           * How to get data from API: https://www.w3schools.com/jsref/api_fetch.asp
           * */}          
          {carData.map((car, index) => {
            return (
              <tr key={index}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td>{car.name}</td>
                <td>{car.releaseYear}</td>
                <td>{car.color}</td>
                <td>✎</td>
                <td onClick={() => handleDelete(car.id)}>🗑</td>
              </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Cars;