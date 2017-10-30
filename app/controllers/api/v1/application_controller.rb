module Api
  module V1
    class ApplicationController < ActionController::Base
      protect_from_forgery with: :null_session
      respond_to :json

      before_action :authenticate_api_v1_user!
    end
  end
end
