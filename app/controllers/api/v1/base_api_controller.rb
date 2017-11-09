module Api
  module V1
    class BaseApiController < ApplicationController
      protect_from_forgery with: :null_session
      respond_to :json
    end
  end
end
