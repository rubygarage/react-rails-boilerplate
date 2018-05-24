module Admin
  module Controllers
    class SessionsController < Admin::Controllers::ApplicationController
      def show
        render :show, layout: false
      end

      def create
        # Make gRPC request to an AUTH domain here and receive a jwt token.
        # Set it in the cookies of original request. No other changes are needed to make it work.
        # Also, please use Operation for that. There is one already created for you
        # HARDCODED EXAMPLE BELOW:

        # result = run ::Admin::Concepts::Session::Operation::Create, params, cookies: cookies
        auth_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJzZXNzaW9uIiwic3ViIjoxLCJleHAiOjE1MjcyODIxNDEsInJvbGVzIjpbImFkbWluIl19.ZquLkDgD_59qo_bkck0ILIYtRo-y9b36_zoI64tep9c"
        cookies['authToken'] = "Bearer #{auth_token}"

        if auth_token # result.success?
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
