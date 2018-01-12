class Users::OmniauthCallbacksController < ApplicationController
  before_action :auth_hash_to_params

  def facebook
    result = run ::Auth::Omniauth::Show
    @new_user = result.failure?
    result = run ::Auth::Omniauth::Create if @new_user

    if result.success?
      @user = serialize(result['model'])
      @token_info = result['authorization'].as_json.to_json.html_safe
    else
      # set only @user (don't save!), pass data for continue ordinary registration
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
    ActiveModelSerializers::SerializableResource.new(
      user, key_transform: :camel_lower, include: '**', serializer: Api::V1::UserSerializer
    ).as_json.to_json.html_safe
  end
end
