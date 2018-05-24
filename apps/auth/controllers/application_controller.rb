module Auth
  module Controllers
    class ApplicationController < ::ApplicationController
      protect_from_forgery with: :exception

      include Pundit
    end
  end
end
