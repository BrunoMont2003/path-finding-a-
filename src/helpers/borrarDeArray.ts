import Casilla from '../classes/Casilla'

const borrarDeArray = (array: Casilla[], casilla: Casilla) => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === casilla) {
      array.splice(i, 1)
    }
  }
}

export default borrarDeArray
