module Admin
  class SessionsController < ::Api::V1::BaseApiController

    def show
      render :show
    end

    def create
      result = run ::Admin::Auth::Session::Create, params, cookies

      if result.success?
        render json: @model,
               serializer: Api::V1::UserSerializer,
               key_transform: :camel_lower,
               include: '**'
      else
        render json: @form, serializer: ::ErrorSerializer, status: :unauthorized
      end
    end

    def destroy
      request.cookies['authToken'] = nil
      redirect_to '/admin/sign_in'
    end
  end
end
