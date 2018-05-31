module Admin
  module Controllers
    class SessionsController < Admin::Controllers::ApplicationController
      def show
        render :show, layout: false
      end

      def create
        result = run ::Admin::Concepts::Session::Operation::Create, params, cookies: cookies

        if result.success?
          redirect_to admin_dashboard_path
        else
          flash.now[:alert] = I18n.t('errors.admin.invalid')
          render :show, layout: false
        end
      end

      def destroy
        run ::Admin::Concepts::Session::Operation::Delete, params, cookies: cookies
        redirect_to '/admin/sign_in'
      end
    end
  end
end
