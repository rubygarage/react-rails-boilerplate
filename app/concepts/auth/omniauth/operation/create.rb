class Auth::Omniauth::Create < Trailblazer::Operation
  POSTFIX = 2

  step :set_unique_name!
  step :initialize_new_user!
  step Contract::Build(constant: Auth::Omniauth::Contract::Create)
  step Contract::Validate()
  step Contract::Persist()
  step :set_token!
  step :set_auth_headers!

  def set_unique_name!(options, params:, **)
   options['username'] = params[:auth_hash][:info][:name]

    taken_usernames = User
      .where("username LIKE ?", "#{options['username']}%")
      .pluck(:username)

    return true if taken_usernames.exclude?(options['username'])

    count = POSTFIX
    loop do
      new_username = "#{options['username']}_#{count}"
      if taken_usernames.exclude?(new_username)
        options['username'] = new_username
        return true
      end
      count += 1
    end
  end

  def initialize_new_user!(options, params:, username:, **)
    options['model'] =
      User.new(
        uid: params[:auth_hash][:uid],
        username: username,
        email: params[:auth_hash][:info][:email],
        password_digest: false,
        provider: params[:provider]
      )
  end

  def set_token!(options, params:, model:, **)
    options['auth_token'] = Auth::Token::Session.generate(model)
  end

  def set_auth_headers!(options, auth_token:, **)
    options['authorization'] = { authorization: "Bearer #{auth_token}" }
  end
end
