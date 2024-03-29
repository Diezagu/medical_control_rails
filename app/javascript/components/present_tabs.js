document.addEventListener('turbo:load', () => {
  const containers = document.querySelectorAll('[data-component="tab-container"]')
  containers.forEach(container => setupContainer(container))
})

const setupContainer = (container) => {
  const tabs = container.querySelectorAll('[data-component-type = "tab"]')
  const forms = container.querySelectorAll('[data-component-type = "form"')
  tabs.forEach((tab) => setupTab(tab, forms, tabs))
}

const setupTab = (tab, forms, tabs) => {
  tab.addEventListener('click', () => {
    setupTabFormat(tabs)
    tab.classList.remove('text-gray-600',
                         'border-gray-600',
                         'hover:text-blue-900',
                         'hover:border-gray-500')
    tab.classList.add('text-blue-800',
                      'border-blue-800',
                      'hover:text-blue-900',
                      'hover:border-blue-900')
    const formId = tab.dataset.target
    forms.forEach((form) => displayForm(form))
    document.getElementById(formId).classList.toggle('hidden')
  })
}

const setupTabFormat = (tabs) => {
  tabs.forEach((tab) => {
    tab.classList.remove('text-blue-800',
                         'border-blue-800',
                         'hover:text-blue-900',
                         'hover:border-blue-900')
    tab.classList.add('text-gray-600',
                      'border-gray-600',
                      'hover:text-blue-900',
                      'hover:border-gray-500')
  })
}

const displayForm = (form) => {
  form.classList.toggle('hidden', 'block')
}