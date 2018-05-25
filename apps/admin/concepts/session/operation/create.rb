class Admin::Concepts::Session::Operation::Create < Trailblazer::Operation
  step :sign_in!

  def sign_in!(options, params:, cookies:, **)
    client = Gruf::Client.new(service: ::Auth::Session)

    auth = client.call(:sign_in, username: params[:username], password: params[:password])

    options['auth_token'] = auth.message.auth_token
    cookies['authToken'] = "Bearer #{auth.message.auth_token}"
  end
end
