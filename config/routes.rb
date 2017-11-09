Rails.application.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :users, only: [:show]

      namespace :auth do
        devise_for :users, controllers: {
                                          confirmations: 'api/v1/auth/confirmations',
                                          sessions: 'api/v1/auth/sessions',
                                          registrations: 'api/v1/auth/registrations',
                                          passwords: 'api/v1/auth/passwords'
                                        }
        scope :users do
          resource :password, only: [:show]
        end
      end
    end
  end
end
