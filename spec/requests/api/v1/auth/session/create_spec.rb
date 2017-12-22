RSpec.describe 'Log in', type: :request do
  path '/auth/users/session' do
    post "Create New User's Session (Log In)" do
      tags 'Session'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :body, in: :body, required: true, schema: {
        properties: {
          username: { type: :string },
          password: { type: :string }
        },
        required: %i[username password]
      }

      response '200', 'User information' do
        let(:user) { create(:user, password: 'password') }

        it 'returns User information' do |example|
          post api_v1_auth_session_path, params: { username: user.username, password: 'password' }

          expect(response.headers).to include('authorization')
          expect(response.headers['authorization']).to start_with('Bearer')

          assert_response_matches_metadata(example.metadata)
        end

        examples 'application/json' => response_schema('auth/registration', :create)
      end

      response '422', 'Invalid request' do
        it 'returns an error' do |example|
          post api_v1_auth_registration_path, params: {}
          
          assert_response_matches_metadata(example.metadata)
        end
      end
    end
  end
end
