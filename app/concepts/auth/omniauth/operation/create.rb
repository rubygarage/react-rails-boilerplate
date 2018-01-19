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
    options['username'] =
      find_unique_username(params[:auth_hash][:info][:name])
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

  private

  def find_unique_username(username)
    taken_usernames = User
      .where("username LIKE ?", "#{username}%")
      .pluck(:username)

    return username if taken_usernames.exclude?(username)

    count = POSTFIX
    loop do
      new_username = "#{username}_#{count}"
      return new_username if taken_usernames.exclude?(new_username)
      count += 1
    end
  end
end
