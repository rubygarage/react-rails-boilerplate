module Admin
  module Controllers
    class ApplicationController < ::ApplicationController
      protect_from_forgery with: :null_session
      before_action :set_views

      private

      def set_views
        # prepend views lookup path so templates will be found in our custom
        # domain-specific folder. Remove this once you move this domain to
        # a separate Rails app
        # P.S. prepend only works for *1* request, so it is called in
        # a before_action to ensure it is always refreshed
        prepend_view_path "#{Rails.root.join('apps', 'admin', 'views')}"
      end
    end
  end
end
