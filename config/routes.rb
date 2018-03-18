Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  resources :messages
  resource :users, only: [:edit, :update]
end
