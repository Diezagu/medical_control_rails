document.addEventListener('turbo:load', () => {
  const searchField = document.getElementById('search-field')
  setupContainer(searchField)
})

const setupContainer = (searchField) => {
  searchField.addEventListener('keydown', () => {
    const searchText = document.getElementById(searchField.id).value
    const searchContainer = document.getElementById('search-container')
    searchContainer.classList.remove('hidden')
    if (searchText.length > 2) {
      const ul = document.getElementById('patients-list');
      ul.innerHTML = ""
      const patients = httpGet(searchText)
      setupPatientsList(patients)
    } else {
      searchContainer.classList.add('hidden')
    }
  })
}

const httpGet = (searchText) => {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open( 'GET', '/search/'+searchText, false )
  xmlHttp.send( null );
  return xmlHttp.responseText
}

const setupPatientsList = (patients) => {
  const ul = document.getElementById('patients-list');
  JSON.parse(patients).forEach(patient => {
    const li = document.createElement('li');
    const link = li.appendChild(document.createElement('a'))
    link.href = `/patients/${patient.id}/edit`
    link.classList.add('flex', 'hover:bg-violet-300')
    link.appendChild(document.createTextNode(patient.name));
    ul.appendChild(li);
  });
}