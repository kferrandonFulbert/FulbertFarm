const field = document.getElementById('field');
const buyPlotButton = document.getElementById('buyPlot');
const coinsDisplay = document.getElementById('coins');

let coins = 12;
let plotCost = 10;

// Initialize field with 4 plots

function initializeField() {
    coinsDisplay.innerText = coins;
  for (let i = 0; i < 4; i++) {
    addPlot();
  }

}

// Add a new plot to the field

function addPlot() {
  const plot = document.createElement('div');
  plot.classList.add('plot');
  plot.textContent = 'Vide';
  plot.addEventListener('dragover', allowDrop);
  plot.addEventListener('drop', dropVegetable);
  field.appendChild(plot);
  // Adjust grid columns if needed
  const columns = Math.ceil(Math.sqrt(field.children.length));
  field.style.gridTemplateColumns = `repeat(${columns}, 100px)`;

}

// Handle buying a new plot

buyPlotButton.addEventListener('click', () => {

  if (coins >= plotCost) {
    coins -= plotCost;
    coinsDisplay.textContent = coins;
    addPlot();
  } else {
    alert("Vous n'avez pas assez de pièces !");
  }
});

// Allow drop on plot

function allowDrop(event) {
  event.preventDefault();
}

// Handle dropping a vegetable on a plot

function dropVegetable(event) {
  event.preventDefault();
  const vegetableType = event.dataTransfer.getData('type');
  const maturationTime = event.dataTransfer.getData('time');
  const value = event.dataTransfer.getData('value');
  if (!this.classList.contains('occupied')) {
    this.classList.add('occupied');
    this.textContent = `${vegetableType} (En croissance)`;
    setTimeout(() => {
      this.textContent = `${vegetableType} (Récolte)`;
      this.dataset.value = value; // Store value on plot
      this.addEventListener('click', harvestVegetable);
    }, maturationTime * 1000);

  } else {

    alert('Ce carré est déjà occupé.');

  }

}

// Handle harvesting a vegetable
function harvestVegetable() {
    console.log(this.dataset.value);
  const value = parseInt(this.dataset.value, 10);
  coins += value;
  coinsDisplay.textContent = coins;

  // Reset plot
  this.classList.remove('occupied');
  this.textContent = 'Vide';
  this.removeEventListener('click', harvestVegetable);
  delete this.dataset.value;

}

// Handle dragging a vegetable
var vegetables = document.getElementsByClassName('vegetable');

for(let i=0; i <vegetables.length; i++){
    vegetables[i].addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('type', event.target.dataset.type);
        event.dataTransfer.setData('time', event.target.dataset.time);
        event.dataTransfer.setData('value', event.target.dataset.value);
      
      });
}
/*
vegetable.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('type', event.target.dataset.type);
  event.dataTransfer.setData('time', event.target.dataset.time);
  event.dataTransfer.setData('value', event.target.dataset.value);

});*/

// Initialize the game

initializeField();

