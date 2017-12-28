require 'rails_helper'

RSpec.describe Auth::Session::Create do
  subject { described_class.call(params, response) }

  let!(:user) { create(:user) }
  let(:response) { { response: ActionDispatch::Response.new } }

  describe 'create session' do
    context 'valid params' do
      let(:params) { { username: user.username, password: user.password } }

      it 'creates session' do
        expect(subject['model']).to eq user
        expect(subject['auth_token']).to be
        expect(subject[:response].header['Authorization']).to start_with 'Bearer '
        expect(subject['contract.default'].errors).to be_empty
      end
    end

    context 'invalid params' do
      let(:params) { { username: 'fake name', password: 'fake password' } }

      it 'does not create session' do
        expect(subject['model']).to be_nil
        expect(subject['auth_token']).to be_nil
        expect(subject[:response].header).to be_empty
      end
    end

    context 'invalid password' do
      let(:params) { { username: user.username, password: 'fake password' } }

      it 'sets model as user' do
        expect(subject['model']).to eq user
        expect(subject['auth_token']).to be_nil
      end

      it 'has errors' do
        expect(subject['contract.default'].errors).not_to be_empty
      end
    end
  end
end
