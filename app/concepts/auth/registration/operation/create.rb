require "trailblazer/operation"

class Auth::Registration::Create < Trailblazer::Operation
  step Model(User, :new)
  step Contract::Build(constant: Auth::Registration::Contract::Create)
  step Contract::Validate()
  step Contract::Persist()
  # step :set_auth_header!

  # def set_auth_header!(options, model:, response:, **)
  #   jwt_token = JWT.encode({ user_id: model.id }, Figaro.env.JWT_SIGNATURE)
  #   response.set_header('Authorization', "Bearer #{jwt_token}")
  # end
end
