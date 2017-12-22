RSpec.describe 'Confirmation', type: :request do
  let(:user) { create(:user) }
  let(:token) { Auth::Token::EmailConfirmation.generate(user) }

  path '/auth/users/confirmation' do
    post 'Confirm user' do
      tags 'Confirmation'
      consumes 'application/json'
      produces 'application/json'

      response '200', 'User confirmed' do
        it 'marks User as confirmed' do |example|
          post api_v1_auth_confirmation_path, params: { confirmation_token: token }

          assert_response_matches_metadata(example.metadata)
        end

        examples 'application/json' => response_schema('auth/registration', :create)
      end

      response '404', 'User not found' do
        it 'returns an error' do |example|

          post api_v1_auth_confirmation_path, params: { confirmation_token: token.sub(/\w$/, 'Y') }

          assert_response_matches_metadata(example.metadata)
        end
      end
    end
  end
end
