require 'rails_helper'

RSpec.describe Auth::Password::Update do
  let(:params) { ActionController::Parameters.new({ password: '123456789', password_confirmation: '123456789' }) }
  let(:subject) { described_class.call(params) }
  let(:user) { FactoryGirl.create(:user, password: 'super_duper_secured_password') }

  describe 'password reset' do
    context 'valid token' do
      before do
        allow(Auth::Token::ResetPassword).to receive(:user_by_token) { user }
      end

      it 'success' do
        expect(subject).to be_success
      end

      it 'set new password' do
        expect(subject['model'].password).to eq '123456789'
      end

      it 'persist model' do
        expect(subject['model']).to be_persisted
      end

      context 'invalid password' do
        let(:params) { ActionController::Parameters.new({ password: 'short', password_confirmation: 'not_match' }) }

        it 'fail' do
          expect(subject).to be_failure
        end

        it 'is not set new password' do
          expect(subject['model'].password).to eq 'super_duper_secured_password'
        end

        it 'show errors' do
          expect(subject['result.contract.default'].errors[:password]).to eq(['size cannot be less than 8'])
        end
      end
    end

    context 'invalid token' do
      it 'fail' do
        allow(Auth::Token::ResetPassword).to receive(:user_by_token) { nil }
        expect(subject).not_to be_success
      end
    end
  end
end
