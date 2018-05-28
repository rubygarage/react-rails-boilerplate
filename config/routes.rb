require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  ActiveAdmin.routes(self)
  namespace :admin do
    scope module: :controllers do
      resource :session, only: %i[show create destroy], path: :sign_in
    end
  end

  # get '/auth/:provider/callback', to: 'users/omniauth_callbacks#facebook'
  scope module: 'storefront/controllers' do
    namespace :api, defaults: { format: 'json' } do
      namespace :v1 do
        resources :users, only: %i[show update] do
          resource :avatar, only: :destroy
        end

        resources :orders, only: %i[show create]
      end
    end
  end

  scope module: 'auth/controllers' do
    namespace :api, defaults: { format: 'json' } do
      namespace :v1 do
        resource :confirmation, only: [:create]
        resource :session, only: %i[show create]
        resource :registration, only: [:create]
        resource :password, only: %i[show create update]
      end
    end
  end
end
