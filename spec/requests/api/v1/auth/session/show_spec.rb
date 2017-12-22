RSpec.describe 'User info', type: :request do
  path '/auth/users/session' do
    get "Show User's Info (Session Show)" do
      tags 'Session'
      consumes 'application/json'
      produces 'application/json'

      parameter name: 'authorization', in: :header, type: :string

      response '200', 'User information' do
        let(:user) { create(:user, email: 'test@example.com', username: 'new_test_user') }
        let(:token) { Auth::Token::Session.generate(user) }

        it 'returns User information' do |example|
          get api_v1_auth_session_path, headers: { authorization: token }

          expect(body).to be_json_eql response_schema('auth/registration', :create).to_json

          assert_response_matches_metadata(example.metadata)
        end

        examples 'application/json' => response_schema('auth/registration', :create)
      end

      response '401', 'Unauthorized' do
        it 'returns an error' do |example|
          get api_v1_auth_session_path, headers: { authorization: '' }

          assert_response_matches_metadata(example.metadata)
        end
      end
    end
  end
end
