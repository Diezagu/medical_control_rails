document.addEventListener('turbo:load', () => {
  const searchFields = document.querySelectorAll('[data-component="search-field"]')
  searchFields.forEach( searchField => setupContainer(searchField))
})

const setupContainer = (searchField) => {
  searchField.addEventListener(['keyup'], () => {
    const searchText = searchField.value
    console.log(searchText)
    const searchContainer = document.getElementById('search-container')
    if (searchText.length > 1) {
      searchContainer.classList.remove('hidden')
      const ul = document.getElementById('patients-list');
      fetchPatients(searchText).then(patients => {
        ul.innerHTML = ""
        setupPatientsList(patients)
      })
    } else {
      searchContainer.classList.add('hidden')
    }
  })
}

const fetchPatients = async (searchText) => {
  const patients = await fetch(`/patients.json?text=${searchText}`)
  const data = await patients.json();
  return data
}

const setupPatientsList = (patients) => {
  const ul = document.getElementById('patients-list');
  patients.forEach(patient => {
    const li = document.createElement('li');
    const link = li.appendChild(document.createElement('a'))
    li.appendChild(document.createElement('hr'));
    link.href = `/patients/${patient.id}/edit`
    link.classList.add('flex', 'hover:bg-violet-300', 'p-1')
    link.appendChild(document.createTextNode(patient.name));
    ul.appendChild(li);
  });
}