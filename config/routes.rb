Rails.application.routes.draw do
  resources :list_follows, only: [:index, :create, :destroy]
  resources :plan_follows, only: [:index, :create, :destroy]
  resources :plan_meals, only: [:create, :update, :destroy]
  resources :meals
  get '/past_meals', to: 'meals#index'

  resources :plans
  get '/featured-plan', to: 'plans#show'
  
  resources :lists
  get '/featured-list', to: 'lists#show'

  resources :items, only: [:create, :update, :destroy]
  # resources :list_items, only: :destroy

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
