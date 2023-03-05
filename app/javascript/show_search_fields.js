document.addEventListener('turbo:load', () => {
  const searchFields = document.querySelectorAll('[data-component="search-field"]')
  searchFields.forEach( searchField => setupContainer(searchField))
})

const setupContainer = (searchField) => {
  searchField.addEventListener(['keyup'], () => {
    const searchText = searchField.querySelector('[data-search="search-input"]').value
    showSearchResults(searchText, searchField)
  })
}

const showSearchResults = (searchText, searchField) => {
  const searchContainer = searchField.querySelector('[data-target="search-container"]')
  if (searchText.length > 1) {
    searchContainer.classList.remove('hidden')
    const patientsList = document.getElementById('patients-list');
    fetchPatients(searchText).then(patients => {
      patientsList.innerHTML = ''
      setupPatientsList(patients)
    })
  } else {
    searchContainer.classList.add('hidden')
  }
}

const fetchPatients = async (searchText) => {
  const response = await fetch(`/patients.json?text=${searchText}`)
  return response.json();
}

const setupPatientsList = (patients) => {
  const patientsList = document.getElementById('patients-list');
  patients.forEach(patient => {
    const searchMatch = document.createElement('li');
    const link = searchMatch.appendChild(document.createElement('a'))
    searchMatch.appendChild(document.createElement('hr'));
    link.href = `/patients/${patient.id}/edit`
    link.classList.add('flex', 'hover:bg-violet-300', 'p-1')
    link.appendChild(document.createTextNode(patient.name));
    patientsList.appendChild(searchMatch);
  });
}
