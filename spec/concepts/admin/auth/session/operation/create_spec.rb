require 'rails_helper'

RSpec.describe Admin::Auth::Session::Create do
  subject { described_class.call(params, response) }
  let!(:admin) { FactoryGirl.create(:user, :admin) }
  let(:response) { { response: ActionDispatch::Response.new } }

  describe 'create session' do
    context 'valid params' do
      let(:params) { { username: admin.username, password: admin.password } }

      it 'setup admin' do
        expect(subject['model']).to eq admin
      end

      it 'setup token' do
        expect(subject['auth_token']).not_to be_nil
      end

      it 'setup response_auth_headers' do
        expect(subject[:response].header['Authorization']).to match 'Bearer '
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

      it 'it not setup response_auth_headers' do
        expect(subject[:response].header).to be_empty
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
