let content = document.getElementById('content');

async function getWheels(){
  try {
    const response = await fetch("http://localhost:3000/wheels");
    const wheels = await response.json();
    return wheels
  } catch (error) {
    console.error("Fetch Errors Get wheels:", error);
  }
}

async function getCars(){
    try{
        const response = await fetch('http://localhost:3000/cars')
        const cars = await response.json()
        return cars
    }catch(error){
        console.log('Fetch Error GET CARS:', error)
    }
}

// Function for looking for car's name
async function lookingCars(name) {
    const cars = await getCars();

    return cars.filter(car =>
        car.make.toLowerCase().includes(name.toLowerCase())
    );
}

document.addEventListener('keypress',async ()=>{
    const searchCar = document.getElementById('searchCar').value
    if(searchCar){
        const car = await lookingCars(searchCar);
        content.innerHTML = ``;
        console.log(car)
    }
});


async function render(){
    const cars = await getCars();
    const wheels = await getWheels();

/*     console.log(wheels) */

    cars.forEach(car => {
        content.innerHTML += `
            <div class="col-md-4 col-sm-12 col-lg-3 card text-center me-3 ms-5 mt-5 mb-5 p-5">
                <h1 class="mb-5 text-primary">${car.make}</h1>
                <div class="">
                    <h4>Model: <b> ${car.model}</b></h4>
                    <h4>Year: <b>${car.year}</b></h4>
                    <h4>Color: <b>${car.color}</b></h4>
                    <h4>Wheels: <b>${wheels[car.wheels_id-1].type}</b></h4>
                </div>
            </div>
        `;
    });
}

render()
