RSpec.describe 'Registration', type: :request do
  path '/auth/users/registration' do
    post 'Create User Profile (Sign Up)' do
      tags 'Registration'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :body, in: :body, required: true, schema: {
        properties: {
          username: { type: :string },
          email: { type: :string },
          password: { type: :string },
          password_confirmation: { type: :string }
        },
        required: %i[username email password password_confirmation]
      }

      response '200', 'User information' do
        let(:params) { attributes_for(:user) }

        it 'returns User information' do
          params[:password_confirmation] = params[:password]
          post api_v1_auth_registration_path, params: params
        end

        examples 'application/vnd.api+json' => response_schema('auth/registration', :user_info)
      end

      response '422', 'Invalid request' do
        it 'returns an error' do
          post api_v1_auth_registration_path, params: {}

          expect(body).to be_json_eql response_schema('auth/registration', :create_error).to_json
        end

        examples 'application/vnd.api+json' => response_schema('auth/registration', :create_error)
      end
    end
  end
end
