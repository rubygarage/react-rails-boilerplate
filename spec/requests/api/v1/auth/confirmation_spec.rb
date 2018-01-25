RSpec.describe 'Confirmation', type: :request do
  let(:user) { create(:user) }
  let(:token) { Auth::Token::EmailConfirmation.generate(user) }

  path '/auth/users/confirmation' do
    post 'Confirm user' do
      tags 'Confirmation'
      consumes 'application/json'

      parameter name: :confirmation_token, in: :path, type: :string

      response '200', 'User confirmed' do
        it 'marks User as confirmed' do |_example|
          post api_v1_auth_confirmation_path, params: { confirmation_token: token }
        end
      end

      response '404', 'User not found' do
        it 'returns an error' do |_example|
          post api_v1_auth_confirmation_path, params: { confirmation_token: token.sub(/\w$/, 'Y') }
        end
      end
    end
  end
end
