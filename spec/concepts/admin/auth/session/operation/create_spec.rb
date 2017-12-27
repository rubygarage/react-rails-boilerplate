require 'rails_helper'

RSpec.describe Admin::Auth::Session::Create do
  subject { described_class.call(params, cookies) }
  let!(:admin) { create(:user, :admin) }
  let(:cookies) { { cookies: {} } }

  describe 'create session' do
    context 'valid params' do
      let(:params) { { username: admin.username, password: admin.password } }

      it 'setup admin' do
        expect(subject['model']).to eq admin
      end

      it 'setup token' do
        expect(subject['auth_token']).to be
      end

      it 'setup authToken to cookies' do
        expect(subject[:cookies]['authToken']).to start_with 'Bearer '
      end

      it 'has no errors' do
        expect(subject).to be_success
      end
    end

    context 'invalid params, fake admin' do
      let(:params) { { username: 'fake name', password: 'fake password' } }

      it 'is not setup admin' do
        expect(subject['model']).to be_nil
      end

      it 'is not setup token' do
        expect(subject['auth_token']).to be_nil
      end

      it 'it not setup authToken to cookies' do
        expect(subject[:cookies]['authToken']).to be_falsey
      end
    end

    context 'only invalid password, real admin' do
      let(:params) { { username: admin.username, password: 'fake password' } }

      it 'setup admin' do
        expect(subject['model']).to eq admin
      end

      it 'is not setup auth_token' do
        expect(subject['auth_token']).to be_nil
      end

      it 'fail' do
        expect(subject).to be_failure
      end
    end
  end
end
