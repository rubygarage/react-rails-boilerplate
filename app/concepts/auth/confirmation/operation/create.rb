require "trailblazer/operation"

class Auth::Confirmation::Create < Trailblazer::Operation
  step :set_confirmation_user!
  success :confirm_email!

  def set_confirmation_user!(options, params:, **)
    options['model'] = User.find_by(confirmation_token: params[:confirmation_token])
  end

  def confirm_email!(_options, model:, **)
    model.confirm unless model.confirmed?
  end
end
