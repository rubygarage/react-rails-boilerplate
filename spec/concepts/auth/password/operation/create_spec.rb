require 'rails_helper'

RSpec.describe Auth::Password::Create do
  let(:params) { ActionController::Parameters.new({ email: user.email }) }
  let(:subject) { described_class.call(params) }
  let!(:user) { FactoryGirl.create(:user) }

  describe 'creating password' do
    context 'persisted user' do
      before do
        instructions = double('email instructions')
        allow(instructions).to receive(:deliver_later)
        allow(ResetPasswordMailer).to receive(:reset_instructions) { instructions }
      end

      it 'success' do
        expect(subject).to be_success
      end

      it 'setup model as existed user' do
        expect(subject['model']).to eq user
      end

      it 'send reset password email' do
        expect(ResetPasswordMailer).to receive_message_chain(:reset_instructions, :deliver_later)
        subject
      end
    end

    context 'nonexistent user' do
      let(:params) { ActionController::Parameters.new({ email: 'nonexistent_email@domain.lol' }) }

      it 'fail' do
        expect(subject).not_to be_success
      end

      it 'is not send reset password email' do
        expect(ResetPasswordMailer).not_to receive(:reset_instructions)
        subject
      end
    end
  end
end
