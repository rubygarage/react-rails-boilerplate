RSpec.describe 'Password', type: :request do
  path '/auth/users/password' do
    let(:user) { create(:user, email: 'test@example.com', username: 'new_test_user') }
    let(:token) { Auth::Token::ResetPassword.generate(user) }

    get "Show Password" do
      tags 'Password'
      consumes 'application/json'
      produces 'application/json'

      parameter name: 'reset_token', in: :path, type: :string

      response '200', "User password" do
        it "returns User's password" do |example|
          get api_v1_auth_password_path, params: { reset_token: token }

          assert_response_matches_metadata(example.metadata)
        end

        examples 'application/json' => response_schema('auth/registration', :create)
      end

      response '404', 'Not found' do
        it 'returns an error' do |example|
          get api_v1_auth_password_path, params: { reset_token: token.sub(/\w$/, 'Y') }

          assert_response_matches_metadata(example.metadata)
        end
      end
    end
  end
end
