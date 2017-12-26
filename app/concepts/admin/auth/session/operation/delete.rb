class Admin::Auth::Session::Delete < Trailblazer::Operation
  step :delete_token_from_cookies!

  def delete_token_from_cookies!(_options, cookies:, **)
    cookies.delete :authToken
  end
end
