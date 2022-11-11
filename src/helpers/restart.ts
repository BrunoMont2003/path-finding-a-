export const createRestartButton = async (parent: HTMLDivElement) => {
  const restartButton = document.createElement('button')
  restartButton.innerText = 'Restart'
  restartButton.id = 'restart'
  parent.appendChild(restartButton)
  restartButton.addEventListener('click', () => {
    location.reload()
  })
}
