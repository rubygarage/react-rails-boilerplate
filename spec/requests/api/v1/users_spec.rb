RSpec.describe 'User', type: :request do
  let(:user) { create(:user, email: 'test@example.com', username: 'new_test_user') }

  before do
    allow_any_instance_of(Api::V1::UsersController).to receive(:current_user) { user }
  end

  path '/users/{id}' do
    get 'Show user' do
      tags 'Users'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer

      response '200', 'Show user' do
        let!(:avatar) { create(:avatar, :with_image, user: user) }

        it 'returns user' do
          expected_json = response_schema(:user, :user_with_avatar).to_json

          get api_v1_user_path(user)

          expect(response).to be_success
          expect(body).to be_json_eql(expected_json).excluding('included')
          expect(body).to have_json_path('included/0/attributes/thumbImage')
          expect(body).to have_json_path('included/0/attributes/originalImage')
        end

        examples 'application/vnd.api+json' => response_schema(:user, :user_with_avatar)
      end

      response '401', 'You are not authenticated' do
        before do
          allow_any_instance_of(Api::V1::UsersController).to receive(:current_user) { nil }
        end

        it 'returns unauthorized error' do
          get api_v1_user_path(user)

          expect(response).to be_unauthorized
        end
      end

      response '403', 'You don’t have permission to access this resource' do
        let!(:other_user) { create(:user) }

        it 'returns forbidden error' do
          get api_v1_user_path(other_user)

          expect(response).to be_forbidden
        end
      end

      response '404', 'User not found' do
        it 'returns no user error' do
          get api_v1_user_path(-1)

          expect(response).to be_not_found
        end
      end
    end

    post 'Update' do
      tags 'Users'
      consumes 'application/json'
      produces 'application/json'

      let(:params) { attributes_for(:user) }

      response '200', 'Updates user' do
        let!(:avatar) { create(:avatar, user: user) }

        it 'returns updated user' do
          put api_v1_user_path(user), params: params
        end
      end

      response '422', 'Error update user' do
        it 'returns update error' do
          put api_v1_user_path(user), params: params.merge(email: '')
        end
      end
    end
  end
end
