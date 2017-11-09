require "trailblazer/operation"

class Auth::Password::Update < Trailblazer::Operation
  step :set_user!
  step Contract::Build(constant: Auth::Password::Contract::Update)
  step Contract::Validate()
  step Contract::Persist()

  def set_user!(options, params:, **)
    options['model'] = User.last # TODO: get user from token
  end
end
