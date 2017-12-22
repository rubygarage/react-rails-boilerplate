require 'rails_helper'

RSpec.describe Auth::Session::Create do
  subject { described_class.call(params, response) }

  let!(:user) { FactoryGirl.create(:user) }
  let(:response) { { response: ActionDispatch::Response.new } }

  describe 'create session' do
    context 'valid params' do
      let(:params) { { username: user.username, password: user.password } }

      it 'setup user' do
        expect(subject['model']).to eq user
      end

      it 'setup token' do
        expect(subject['auth_token']).not_to be_nil
      end

      it 'setup response_auth_headers' do
        expect(subject[:response].header['Authorization']).to match 'Bearer '
      end

      it 'has no errors' do
        expect(subject['contract.default'].errors).to be_empty
      end
    end

    context 'invalid params, fake user' do
      let(:params) { { username: 'fake name', password: 'fake password' } }

      it 'is not setup user' do
        expect(subject['model']).to be_nil
      end

      it 'is not setup token' do
        expect(subject['auth_token']).to be_nil
      end

      it 'it not setup response_auth_headers' do
        expect(subject[:response].header).to be_empty
      end
    end

    context 'only invalid password, real user' do
      let(:params) { { username: user.username, password: 'fake password' } }

      it 'setup user' do
        expect(subject['model']).to eq user
        expect(subject['auth_token']).to be_nil
      end

      it 'has errors' do
        expect(subject['contract.default'].errors).not_to be_empty
      end
    end
  end
end
