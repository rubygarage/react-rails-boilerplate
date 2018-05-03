RSpec.describe 'Password', type: :request do
  let(:user) { create(:user, email: 'test@example.com', username: 'new_test_user') }
  let(:token) { Auth::Token::ResetPassword.generate(user) }
  let(:password) { 'NewPassword' }

  path '/auth/users/password' do
    get 'Validate reset token (Show Password)' do
      tags 'Password'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :reset_token, in: :query, type: :string, required: true

      response '200', 'Validate reset token' do
        it 'returns OK' do
          get api_v1_auth_password_path, params: { reset_token: token }

          expect(response).to be_success
        end
      end

      response '404', 'Not found' do
        let(:user) { build_stubbed(:user) }

        it 'returns an error' do
          get api_v1_auth_password_path, params: { reset_token: token }

          expect(response).to be_not_found
        end
      end
    end
  end

  #  ------------------------------------------------------------------------------------------------------------------

  path '/auth/users/password' do
    post 'Create Password' do
      tags 'Password'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :body, in: :body, required: true, schema: {
        properties: {
          email: { type: :string }
        },
        required: :email
      }

      response '200', 'Email found' do
        it 'informs that provided email is found in database' do
          post api_v1_auth_password_path, params: { email: user.email }
        end

        it 'returns ok even if email did not found in database, for security reason' do
          post api_v1_auth_password_path, params: { email: 'random_email_123@test.com' }
        end
      end

      response '422', 'Unprocessable Entity' do
        it 'returns an error' do
          post api_v1_auth_password_path, params: { email: 'invalid.email.com' }

          expect(body).to have_json_path('errors/0/detail')
          expect(body).to match(/is in invalid format/)
        end
      end
    end
  end

  #  ------------------------------------------------------------------------------------------------------------------

  path '/auth/users/password' do
    patch 'Update Password' do
      tags 'Password'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :body, in: :body, required: true, schema: {
        properties: {
          reset_token: { type: :string },
          password: { type: :string },
          password_confirmation: { type: :string }
        },
        required: %i[reset_token password password_confirmation]
      }

      response '200', "Update user's password" do
        it 'returns User' do |example|
          patch api_v1_auth_password_path, params: { reset_token: token,
                                                     password: password,
                                                     password_confirmation: password }

          expect(body).to be_json_eql response_schema('auth', :user_info).to_json

          assert_response_matches_metadata(example.metadata)
        end

        examples 'application/vnd.api+json' => response_schema('auth', :user_info)
      end

      response '422', 'Unprocessable Entity' do
        it 'returns an error' do
          patch api_v1_auth_password_path, params: { reset_token: token,
                                                     password: password,
                                                     password_confirmation: password + '123' }
        end
      end
    end
  end
end
