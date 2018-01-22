class Auth::Omniauth::Prepare < Trailblazer::Operation
  REQUIRED_FIELDS = %w[username email provider uid]

  step :new_user?
  step :collect_info!
  step :form_user_data!
  step :set_avatar!
  step :set_action_type!

  def new_user?(options, params:, **)
    options['new_user?'] =
      !User.exists?(
        uid: params[:token_info][:id],
        provider: params[:provider]
      )
  end

  def collect_info!(options, params:, **)
    options['model'] =
      User.new(
        uid: params[:token_info][:id],
        username: params[:token_info][:name],
        email: params[:token_info][:email],
        password_digest: false,
        provider: params[:provider]
      )
  end

  def form_user_data!(options, model:, **)
    options['user'] = model.attributes.slice *REQUIRED_FIELDS
  end

  def set_avatar!(options, params:, **)
    options['avatar'] = params[:auth_hash]['info']['image']
  end

  def set_action_type!(options, **)
    options['action'] = 'signup'
  end
end
