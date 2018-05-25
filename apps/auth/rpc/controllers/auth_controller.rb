class AuthController < Gruf::Controllers::Base
  bind ::Auth::Session::Service

  def sign_in
    username = request.message.username
    password = request.message.password
    remember = true

    user = ::Auth::Models::User.find_by(username: username)
    contract = Auth::Concepts::Session::Contract::Create.new(user)

    if contract.validate(username: username, password: password)
      Auth::SignInResponse.new(
        auth_token: ::Auth::Token::Session.generate(user, remember)
      )
    else
      Auth::SignInResponse.new(auth_token: '')
    end
  end
end
