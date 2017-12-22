RSpec.describe 'Password', type: :request do
  path '/auth/users/password' do
    let(:user) { create(:user) }
    # let(:token) { Auth::Token::Session.generate(user) }

    post "Create Password" do
      tags 'Password'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :body, in: :body, required: true, schema: {
        properties: {
          email: { type: :string }
        },
        required: :email
      }

      response '200', "User password" do
        it "returns User's password" do |example|
          post api_v1_auth_password_path, params: { email: user.email }
          
          assert_response_matches_metadata(example.metadata)
        end

        examples 'application/json' => response_schema('auth/registration', :create)
      end

      response '422', 'Unprocessable Entity' do
        it 'returns an error' do |example|
          post api_v1_auth_password_path, params: { email: 'asd@asd.asd' }
          binding.pry

          assert_response_matches_metadata(example.metadata)
        end
      end
    end
  end
end
