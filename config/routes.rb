Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resources :patients
  get 'search/:name', to: 'patients#search_patient'
  root 'patients#index'
end
