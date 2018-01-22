RSpec.describe Auth::Omniauth::Prepare do
  let(:subject) { described_class.call(params) }
  let(:user) { build(:user, :facebook_provider) }

  describe 'set user' do
    context 'new user' do
      let(:params) do
        {
          provider: user.provider,
          token_info: {
            id: user.uid,
            email: user.email,
            name: user.username
          },
          auth_hash: {
            'info' => {
              'image' => 'https://image_url.jpg'
            }
          }
        }
      end

      it 'sets flag as new user' do
        expect(subject['new_user?']).to eq true
      end

      it 'sets user as unpersisted model' do
        expect(subject['model'].username).to eq user.username
        expect(subject['model']).not_to be_persisted
      end

      it 'forms user data as key: :value' do
        expect(subject['user']['username']).to eq user.username
        expect(subject['user']['email']).to eq user.email
        expect(subject['user']['uid']).to eq user.uid
        expect(subject['user']['provider']).to eq user.provider
      end

      it 'sets avatar url' do
        expect(subject['avatar']).to eq params[:auth_hash]['info']['image']
      end

      it 'sets action type' do
        expect(subject['action']).to eq 'signup'
      end
    end

    context 'persisted user' do
      let(:persisted_user) { create(:user, :facebook_provider) }

      let(:params) do
        {
          provider: persisted_user.provider,
          token_info: {
            id: persisted_user.uid,
            email: persisted_user.email,
            name: persisted_user.username
          },
          auth_hash: {
            'info' => {
              'image' => 'https://image_url.jpg'
            }
          }
        }
      end

      it 'does not set model' do
        expect(subject['model']).to be_nil
      end

      it 'does not form user data' do
        expect(subject['user']).to be_nil
      end

      it 'does not set avatar url' do
        expect(subject['avatar']).to be_nil
      end

      it 'does not set action type' do
        expect(subject['action']).to be_nil
      end
    end
  end
end
