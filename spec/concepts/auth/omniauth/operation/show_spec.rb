RSpec.describe Auth::Omniauth::Show do
  let(:subject) { described_class.call(params) }
  let(:user) { create(:user, :facebook_provider) }

  describe 'set user' do
    context 'persisted user' do
      let(:params) do
        {
          provider: user.provider,
          token_info: {
            id: user.uid
          }
        }
      end

      it 'sets user as persisted model' do
        expect(subject['model'].username).to eq user.username
        expect(subject['model'].uid).to eq user.uid
        expect(subject['model'].provider).to eq user.provider
        expect(subject['model']).to be_persisted
      end

      it 'sets auth token' do
        expect(subject['auth_token']).to be
      end

      it 'sets auth headers' do
        expect(subject['authorization']).to be
        expect(subject['authorization'][:authorization]).to start_with 'Bearer '
      end

      it 'sets action type' do
        expect(subject['action']).to eq 'signin'
      end
    end

    context 'invalid params' do
      let(:params) do
        {
          provider: 'unexisted',
          token_info: {
            id: '0000'
          }
        }
      end

      it 'does not set user as persisted model' do
        expect(subject['model']).to be_nil
      end

      it 'does not set auth token' do
        expect(subject['auth_token']).to be_nil
      end

      it 'does not set auth headers' do
        expect(subject['authorization']).to be_nil
      end

      it 'does not set action type' do
        expect(subject['action']).to be_nil
      end
    end
  end
end
