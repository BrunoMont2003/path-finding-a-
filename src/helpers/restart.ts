export const createRestartButton = async () => {
  const container = document.getElementById('container') as HTMLDivElement
  console.log(container)
  const button = document.createElement('button')
  button.id = 'restart'
  button.innerText = 'Restart'
  button.classList.add('btn')
  button.classList.add('btnRestart')
  button.addEventListener('click', () => {
    window.location.reload()
  })
  container.appendChild(button)
}
