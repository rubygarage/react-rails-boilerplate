module Admin
  class SessionsController < ::Api::V1::BaseApiController
    def show
      render :show, layout: false
    end

    def create
      result = run ::Admin::Auth::Session::Create, params, cookies: cookies

      if result.success?
        redirect_to admin_dashboard_path
      else
        flash.now[:alert] = I18n.t('errors.admin.invalid')
        render :show, layout: false
      end
    end

    def destroy
      run ::Admin::Auth::Session::Delete, params, cookies: cookies
      redirect_to '/admin/sign_in'
    end
  end
end
