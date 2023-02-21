document.addEventListener("turbo:load", () => {
  const containers = document.querySelectorAll('[data-component="tab-container"]');
  containers.forEach(container => setupContainer(container))
})

const setupContainer = (container) => {
  let tabs = container.querySelectorAll('[data-component-type = "tab"]')
  let forms = container.querySelectorAll('[data-component-type = "form"')
  tabs.forEach((tab) => setupTab(tab, forms, tabs))
}

const setupTab = (tab, forms, tabs) => {
  tab.addEventListener('click', (e) => {
    setupTabFormat(tabs)
    e.target.classList.remove("text-gray-600",
                              "border-gray-600",
                              "hover:text-gray-500",
                              "hover:border-gray-500")
    e.target.classList.add("text-blue-600",
                            "border-blue-600",
                            "hover:text-blue-500",
                            "hover:border-blue-500")
    let formId = e.target.dataset['target']
    forms.forEach((form) => displayForm(form))
    document.getElementById(formId).classList.toggle('hidden')
  })
}

const setupTabFormat = (tabs) => {
  tabs.forEach((tab) => {
    tab.classList.remove("text-blue-600",
                         "border-blue-600",
                         "hover:text-blue-500",
                         "hover:border-blue-500")
    tab.classList.add("text-gray-600",
                      "border-gray-600",
                      "hover:text-gray-500",
                      "hover:border-gray-500")
  })
}

const displayForm = (form) => {
  form.classList.toggle('hidden', 'block')
}