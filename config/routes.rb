Rails.application.routes.draw do
  resources :comments
  resources :posts
  resources :memberships
  resources :clubs
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "clubs#index"
  get '/authorized_user', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/home', to: 'clubs#index'
  post '/memberships', to: 'memberships#create'
  
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

end
