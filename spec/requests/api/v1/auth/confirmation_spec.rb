RSpec.describe 'Confirmation', type: :request do
  let(:user) { create(:user) }
  let(:token) { Auth::Token::EmailConfirmation.generate(user) }

  path '/auth/users/confirmation' do
    post 'Confirm user' do
      tags 'Confirmation'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :confirmation_token, in: :query, type: :string, required: true

      response '200', 'User confirmed' do
        it 'marks User as confirmed' do
          post api_v1_auth_confirmation_path, params: { confirmation_token: token }

          expect(response).to be_success
        end
      end

      response '404', 'User not found' do
        let(:user) { build_stubbed(:user) }

        it 'returns an error' do
          post api_v1_auth_confirmation_path, params: { confirmation_token: token }

          expect(response).to be_not_found
        end
      end
    end
  end
end
