require 'rails_helper'

RSpec.describe Auth::Registration::Create do
  let(:subject) { described_class.call(params) }
  let(:user) { FactoryGirl.build(:user) }

  describe 'create user' do
    context 'valid params' do
      let(:params) {
        {
          username: user.username,
          password: user.password,
          password_confirmation: user.password,
          email: user.email
        }
      }

      it 'setup user' do
        expect(subject['model'].username).to eq user.username
        expect(subject['model'].email).to eq user.email
      end

      it 'persist user' do
        expect(subject['model']).to be_persisted
      end

      it 'send confirmation email' do
        expect(ConfirmationMailer).to receive(:confirmation_email).and_call_original.once
        subject
      end
    end
  end
end
