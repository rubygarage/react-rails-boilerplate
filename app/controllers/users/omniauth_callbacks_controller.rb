class Users::OmniauthCallbacksController < ApplicationController
  before_action :auth_hash_to_params

  def facebook
    result = run ::Auth::Omniauth::Show
    result = run ::Auth::Omniauth::Create if result.failure?

    if result.success?
      @user = serialize(result['model'])
      @token_info = result['authorization'].to_json.html_safe
    end

    render partial: 'partials/omniauth/close_popup', layout: false
  end

  protected

  def auth_hash_to_params
    params[:auth_hash] = request.env['omniauth.auth']
  end

  def serialize(user)
    ActiveModelSerializers::SerializableResource.new(
      user, key_transform: :camel_lower, include: '**', serializer: Api::V1::UserSerializer
    ).to_json.html_safe
  end
end
