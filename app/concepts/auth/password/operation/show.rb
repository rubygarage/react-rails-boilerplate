require "trailblazer/operation"

class Auth::Password::Show < Trailblazer::Operation
  step :validate_token!

  def validate_token!(options, params:, **)
    true
  end
end
