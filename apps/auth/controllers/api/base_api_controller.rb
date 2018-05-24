module Auth
  module Controllers
    module Api
      class BaseApiController < ::Auth::Controllers::ApplicationController
        protect_from_forgery with: :null_session
      end
    end
  end
end
