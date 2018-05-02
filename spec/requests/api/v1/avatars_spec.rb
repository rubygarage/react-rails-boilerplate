RSpec.describe 'Avatar', type: :request do
  let(:user) { create(:user) }

  before do
    allow_any_instance_of(Api::V1::AvatarsController).to receive(:current_user) { user }
  end

  path '/users/{user_id}/avatar' do
    delete 'Delete avatar' do
      tags 'Avatars'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user_id, in: :path, type: :integer

      response '200', 'Destroy avatar' do
        let!(:avatar) { create(:avatar, user: user) }

        it 'returns success' do
          delete api_v1_user_avatar_path(user)

          expect(response).to be_success
        end
      end

      response '401', 'You are not authenticated' do
        before do
          allow_any_instance_of(Api::V1::AvatarsController).to receive(:current_user) { nil }
        end

        it 'returns unauthorized' do
          delete api_v1_user_avatar_path(user)

          expect(response).to be_unauthorized
        end
      end

      response '403', 'You don’t have permission to access this resource' do
        let!(:other_user) { create(:user) }
        let!(:other_avatar) { create(:avatar, user: other_user) }

        it 'returns forbidden' do
          delete api_v1_user_avatar_path(other_user)

          expect(response).to be_forbidden
        end
      end

      response '404', 'Avatar not found' do
        it 'returns not found' do
          delete api_v1_user_avatar_path(user)

          expect(response).to be_not_found
        end
      end
    end
  end
end
