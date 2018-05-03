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
        let!(:avatar) { create(:avatar, :with_image, user: user) }

        it 'returns User information' do
          expected_json = response_schema('auth/session', :user_info).to_json

          get api_v1_auth_session_path, headers: { authorization: token }

          expect(response).to be_success
          expect(body).to be_json_eql(expected_json).excluding('included')
          expect(body).to have_json_path('included/0/attributes/thumbImage')
          expect(body).to have_json_path('included/0/attributes/originalImage')
        end

        examples 'application/vnd.api+json' => response_schema('auth/session', :user_info)
      end

      response '401', 'Unauthorized' do
        it 'returns an error' do
          get api_v1_auth_session_path, headers: { authorization: '' }

          expect(response).to be_unauthorized
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
          password: { type: :string },
          remember: { type: :boolean }
        },
        required: %i[username password]
      }

      response '200', 'Authorization token' do
        let(:user) { create(:user, password: password) }
        let(:token) { 'an_awesome_token' }
        let(:password) { 'an_awesome_password' }

        it "returns user's authorization token" do
          expect(Auth::Token::Session).to receive(:generate) { token }

          post api_v1_auth_session_path, params: { username: user.username, password: password }

          expect(response).to be_success
          expect(response.headers['authorization']).to eq("Bearer #{token}")
        end
      end

      response '422', 'Invalid request' do
        it 'returns an error status' do
          post api_v1_auth_session_path, params: {}

          expect(response).to be_unprocessable
          expect(body).to be_json_eql response_schema('auth/session', :create_error).to_json
        end

        examples 'application/vnd.api+json' => response_schema('auth/session', :create_error)
      end
    end
  end
end
