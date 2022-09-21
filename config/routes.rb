Rails.application.routes.draw do
  
  resources :likes
  get "/likes/by-post-id/:post_id", to: "likes#by_post_id"
  resources :comments
  get "/comments/by-post-id/:post_id", to: "comments#by_post_id"
  resources :challenge_descriptions
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  get '/show2/:id', to: 'users#show2'
  get '/show3/:id', to: 'users#show3'
  resources :posts
  resources :challenges
  resources :users
  resources :follows, only: [:create, :index, :show]
  delete '/follows/:followed_user', to: 'follows#destroy'
  # post '/users/:id/unfollow', to: "users#unfollow", as: "unfollow_user"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
