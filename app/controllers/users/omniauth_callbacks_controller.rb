class Users::OmniauthCallbacksController < ApplicationController
  before_action :auth_hash_to_params

  def facebook
    result = run ::Auth::Omniauth::Show
    @new_user = result.failure?
    result = run ::Auth::Omniauth::Create if @new_user

    if result.success?
      user = result['model']
      serialize(user)
      @token_info = result['auth_token']
    end

    render partial: 'partials/omniauth/close_popup', layout: false
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end

  def auth_hash_to_params
    params[:token_info] = auth_hash[:extra][:raw_info]
  end

  def serialize(user)
    @user = ActiveModelSerializers::SerializableResource.new(
      user, key_transform: :camel_lower, include: '**', serializer: Api::V1::UserSerializer
    ).as_json.to_json
  end
end
