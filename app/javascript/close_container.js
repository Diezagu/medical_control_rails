document.addEventListener("turbo:load", () => {
  const containers = document.querySelectorAll('[data-component="closable"]');
  console.log(containers)
  containers.forEach(container => setupContainer(container))
})

const setupContainer = (container) => {
  document.getElementById('close-btn').addEventListener('click', () => {
    container.classList.toggle('hidden')
  })
}