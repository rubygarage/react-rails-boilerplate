Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :users, only: [:show]

      namespace :auth do
        scope :users do
          resource :confirmation, only: [:create]
          resource :session, only: %i[show create]
          resource :registration, only: [:create]
          resource :password, only: %i[show create update]
        end
      end
    end
  end
end
