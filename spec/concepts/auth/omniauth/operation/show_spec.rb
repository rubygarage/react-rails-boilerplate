RSpec.describe Auth::Omniauth::Show do
  let(:subject) { described_class.call(params) }
  let(:user) { create(:user, :facebook_provider) }

  describe 'set user' do
    context 'persisted user' do
      let(:params) do
        {
          provider: user.provider,
          auth_hash: {
            uid: user.uid
          }
        }
      end
      let!(:auth_token) { double('Authentication Token') }

      before do
        allow(Auth::Token::Session).to receive(:generate) { auth_token }
      end

      it 'sets user as persisted model' do
        expect(subject['model'].username).to eq user.username
        expect(subject['model'].uid).to eq user.uid
        expect(subject['model'].provider).to eq user.provider
        expect(subject['model']).to be_persisted
      end

      it 'sets auth token' do
        expect(subject['auth_token']).to be
        expect(subject['auth_token']).to eq auth_token
      end

      it 'sets auth headers' do
        expect(subject['authorization']).to be
        expect(subject['authorization'][:authorization]).to start_with 'Bearer '
        expect(subject['authorization'][:authorization]).to eq "Bearer #{auth_token}"
      end
    end

    context 'invalid params' do
      let(:params) do
        {
          provider: 'unexisted',
          auth_hash: {
            uid: '0000'
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
    end
  end
end
