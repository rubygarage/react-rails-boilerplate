require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  ActiveAdmin.routes(self)
  namespace :admin do
    resource :session, only: %i[show create destroy], path: :sign_in
  end

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :users, only: %i[show update] do
        resource :avatar, only: :destroy
      end

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
