RSpec.describe Auth::Omniauth::Create do
  let(:subject) { described_class.call(params) }
  let(:user) { build(:user, :facebook_provider) }

  describe 'create new user' do
    let(:params) do
      {
        provider: user.provider,
        auth_hash: {
          uid: user.uid,
          info: {
            name: user.username,
            email: user.email
          }
        }
      }
    end

    it 'initialize new user and save them' do
      expect(subject['model'].username).to eq user.username
      expect(subject['model'].uid).to eq user.uid
      expect(subject['model'].provider).to eq user.provider
      expect(subject['model']).to be_persisted
    end

    it 'sets auth token' do
      auth_token = double('Authentication Token')
      allow(Auth::Token::Session).to receive(:generate) { auth_token }

      expect(subject['auth_token']).to be
      expect(subject['auth_token']).to eq auth_token
    end

    it 'sets auth headers' do
      expect(subject['authorization']).to be
      expect(subject['authorization'][:authorization]).to start_with 'Bearer '
    end

    context 'taken username' do
      it 'sets username postfix' do
        user.save
        expect(subject['model'].username).to eq "#{user.username}_2"
      end
    end

    context 'invalid params' do
      let(:params) do
        {
          provider: user.provider,
          auth_hash: {
            uid: nil,
            info: {}
          }
        }
      end

      it 'does not set user as persisted model' do
        expect(subject['model']).not_to be_persisted
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
