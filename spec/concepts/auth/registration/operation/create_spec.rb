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

      before do
        confirmation = double('email confirmation')
        allow(confirmation).to receive(:deliver_later)
        allow(ConfirmationMailer).to receive(:confirmation_email) { confirmation }
      end

      it 'setup user' do
        expect(subject['model'].username).to eq user.username
        expect(subject['model'].email).to eq user.email
      end

      it 'persist user' do
        expect(subject['model']).to be_persisted
      end

      it 'send confirmation email' do
        expect(ConfirmationMailer).to receive_message_chain(:confirmation_email, :deliver_later)
        subject
      end
    end

    context 'invalid params' do
      let(:params) { { username: user.username, password: user.password, email: user.email } }

      it 'is not setup user' do
        expect(subject['model'].username).to be_nil
        expect(subject['model'].email).to be_nil
      end

      it 'show errors' do
        expect(subject['result.contract.default'].errors[:password_confirmation]).to include "doesn't match"
      end

      it 'fail validation' do
        expect(subject).to be_failure
      end

      it 'not to persist user' do
        expect(subject['model']).not_to be_persisted
      end

      it 'is not send confirmation email' do
        expect(ConfirmationMailer).not_to receive(:confirmation_email)
        subject
      end
    end
  end
end
