Rails.application.routes.draw do
  resources :list_items
  resources :lists
  resources :items
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
