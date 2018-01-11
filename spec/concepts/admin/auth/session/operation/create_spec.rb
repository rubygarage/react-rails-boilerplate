RSpec.describe Admin::Auth::Session::Create do
  subject { described_class.call(params, cookies) }
  let!(:admin) { create(:user, :admin) }
  let(:cookies) { { cookies: {} } }

  describe 'create session' do
    context 'valid params' do
      let(:params) { { username: admin.username, password: admin.password } }

      it 'sets session' do
        expect(subject['model']).to eq admin
        expect(subject['auth_token']).to be
        expect(subject[:cookies]['authToken']).to start_with 'Bearer '
        expect(subject).to be_success
      end
    end

    context 'invalid params' do
      let(:params) { { username: 'fake name', password: 'fake password' } }

      it 'does not sets session' do
        expect(subject['model']).to be_nil
        expect(subject['auth_token']).to be_nil
        expect(subject[:cookies]['authToken']).to be_falsey
        expect(subject).to be_failure
      end
    end

    context 'invalid password' do
      let(:params) { { username: admin.username, password: 'fake password' } }

      it 'setup admin' do
        expect(subject['model']).to eq admin
        expect(subject['auth_token']).to be_nil
        expect(subject[:cookies]['authToken']).to be_falsey
        expect(subject).to be_failure
      end
    end
  end
end
