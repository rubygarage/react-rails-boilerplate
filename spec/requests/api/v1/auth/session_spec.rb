RSpec.describe 'Session', type: :request do
  path '/auth/users/session' do
    get "Show User's Info (Session Show)" do
      tags 'Session'
      consumes 'application/json'
      produces 'application/json'

      parameter name: 'authorization', in: :header, type: :string

      response '200', 'User information' do
        let(:user) { create(:user, email: 'test@example.com', username: 'new_test_user') }
        let(:token) { Auth::Token::Session.generate(user) }

        it 'returns User information' do |_example|
          get api_v1_auth_session_path, headers: { authorization: token }

          expect(body).to be_json_eql response_schema('auth', :user_info).to_json
        end

        examples 'application/vnd.api+json' => response_schema('auth', :user_info)
      end

      response '401', 'Unauthorized' do
        it 'returns an error' do |_example|
          get api_v1_auth_session_path, headers: { authorization: '' }
        end
      end
    end
  end

  #  ------------------------------------------------------------------------------------------------------------------

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

      response '200', 'Authorization token' do
        let(:user) { create(:user, password: 'password') }

        it "returns user's authorization token" do |_example|
          post api_v1_auth_session_path, params: { username: user.username, password: 'password' }

          expect(response.headers).to include('authorization')
          expect(response.headers['authorization']).to start_with('Bearer')
        end
      end

      response '422', 'Invalid request' do
        it 'returns an error status' do |_example|
          post api_v1_auth_registration_path, params: {}
        end
      end
    end
  end
end
