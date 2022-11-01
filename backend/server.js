
/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js 
 * import express */
 const express = require('express');
//  const cors = require('cors');
 const app = express();
//  // middleware
//  app.use(express.json());
//  app.use(cors())

let carsMockData = [
    {
        "id": 1,
        "brand": "Hyundai",
        "name": "Ioniq",
        "releaseYear": 2017,
        "color": "blue"
    },
    {
        "id": 2,
        "brand": "Toyota",
        "name": "Prius",
        "releaseYear": 2007,
        "color": "blue"
    },
    {
        "id": 3,
        "brand": "Chevrolet",
        "name": "Aveo",
        "releaseYear": 2007,
        "color": "white"
    },
    {
        "id": 4,
        "brand": "BMW",
        "name": "M5",
        "releaseYear": 2017,
        "color": "White"
    },
    {
        "id": 5,
        "brand": "Tesla",
        "name": "S",
        "releaseYear": 2019,
        "color": "Black"
    }
]

/** Create GET API. API shoudl return  const carsMockData*/

app.get('/cars-data', (req, res) =>{
    res.send(carsMockData)
})



/** Create POST API. Get the new car data from react. 
 *      Check if car with id exists. If Yes return 500. With message 'Car already exists'
 *      If there is no car with the id, add the new car to  carsMockData and return carsMockData as response */

 app.post('/cars-data/:id', (req, res) =>{
   const car = carsMockData.find(car => car.id === parseInt(req.params.id));
   if(car){
       res.status(500).send('Car already exists');
       return;
   } 
    const carr = {
        id: req.params.id,
        brand: req.body.brand,
        name: req.body.name,
        releaseYear: req.body.releaseYear,
        color: req.body.color
    };
    carsMockData.push(carr);
    res.send(carsMockData);

});




/** Create PUT API. 
 *  Check if car with id exists. If No return 500 with error 'No car with given id exist'. 
 *  If there is car with the requested id, update that car's data in 'carsMockData' and return 'carsMockData' */
 app.put('/cars-data/:id', (req, res) =>{
    const car = carsMockData.find(car => car.id === parseInt(req.params.id));
    if(!car){
        res.status(500).send('No car with given id exist');
        return;
    }
    car = {
        id: req.params.id,
        brand: req.body.brand,
        name: req.body.name,
        releaseYear: req.body.name,
        color: req.body.name

    };
    res.send(carsMockData);
 });



/** Create Delete API. 
 *  Check if car with id exists. If No return 500. With message 'No car with give id exists'
 *  If there is car with the requested id. Delete that car from 'carsMockData' and return 'carsMockData'
*/

app.delete('/cars-data/:id', (req, res) => {
    const car = carsMockData.find(car => car.id === parseInt(req.params.id));
    if(!car){
        res.status(500).send('No car with give id exists');
        return;
    }
    const i = carsMockData.indexOf(car);
    carsMockData.splice(i, 1);
    res.send(carsMockData)

});
app.listen(3001)