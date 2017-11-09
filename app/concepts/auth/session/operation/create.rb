require "trailblazer/operation"

class Auth::Session::Create < Trailblazer::Operation
  success :set_user!
  step Contract::Build(constant: Auth::Session::Contract::Create)
  step Contract::Validate()
  step :set_token!

  def set_user!(options, params:, **)
    options['model'] = User.find_by(username: params[:username])
  end

  def set_token!(_options, model:, response:, **)
    jwt_token = JWT.encode({ user_id: model.id }, Figaro.env.JWT_SIGNATURE)
    response.set_header('Authorization', "Bearer #{jwt_token}")
  end
end
