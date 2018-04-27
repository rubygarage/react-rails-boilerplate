RSpec.describe 'Avatar', type: :request do
  path '/avatars' do
    delete 'Delete avatar' do
      tags 'Avatars'
      consumes 'application/json'
      produces 'application/json'

      let(:user) { create(:user) }

      before do
        allow_any_instance_of(Api::V1::AvatarsController).to receive(:current_user).and_return(user)
      end

      response '200', 'Destroy avatar' do
        let!(:avatar) { create(:avatar, user: user) }

        it 'returns success' do
          delete api_v1_user_avatar_path(user.id)
        end
      end

      response '404', 'Destroy avatar' do
        it 'returns not modified' do
          delete api_v1_user_avatar_path(user.id)
        end
      end
    end
  end
end
