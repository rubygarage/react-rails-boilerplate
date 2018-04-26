require 'rails_helper'

RSpec.describe ResetPasswordMailer, type: :mailer do
  describe 'reset instructions' do
    subject { ResetPasswordMailer.reset_instructions(user) }

    let(:user) { create(:user) }
    let(:token) { FFaker::Guid.guid }

    it 'renders the headers and token' do
      expect(Auth::Token::ResetPassword).to receive(:generate) { token }

      expect(subject.to).to eq([user.email])
      expect(subject.body.encoded).to include(token)
    end
  end
end
