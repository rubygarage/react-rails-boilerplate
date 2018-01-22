class Users::OmniauthCallbacksController < ApplicationController
  before_action :auth_hash_to_params

  def facebook
    @result = run ::Auth::Omniauth::Show

    if @result.success?
      @new_user = false
      @user = serialize(@result['model'])
      @token_info = @result['authorization'].to_json.html_safe
    else
      @result = run ::Auth::Omniauth::Prepare
    end

    render partial: "partials/omniauth/close_popup_#{@result['action']}", layout: false
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end

  def auth_hash_to_params
    params[:auth_hash] = auth_hash
    params[:token_info] = auth_hash[:extra][:raw_info]
  end

  def serialize(user)
    ActiveModelSerializers::SerializableResource.new(
      user, key_transform: :camel_lower, include: '**', serializer: Api::V1::UserSerializer
    ).as_json.to_json.html_safe
  end
end
