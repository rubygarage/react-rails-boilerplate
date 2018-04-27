RSpec.describe 'User', type: :request do
  let(:user) { create(:user) }

  before do
    allow_any_instance_of(Api::V1::UsersController).to receive(:current_user).and_return(user)
  end

  path '/users' do
    get 'Show' do
      tags 'Users'
      consumes 'application/json'
      produces 'application/json'

      response '200', 'Show user' do
        let!(:avatar) { create(:avatar, user: user) }

        it 'returns user' do
          get api_v1_user_path(user.id)
        end
      end

      response '404', 'User not found' do
        it 'returns no user error' do
          get api_v1_user_path(-1)
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
          put api_v1_user_path(user.id), params: params
        end
      end

      response '422', 'Error update user' do
        it 'returns update error' do
          put api_v1_user_path(user.id), params: params.merge(email: '')
        end
      end
    end
  end
end
