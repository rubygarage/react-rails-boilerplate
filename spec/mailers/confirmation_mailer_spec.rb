require 'rails_helper'

RSpec.describe ConfirmationMailer, type: :mailer do
  describe 'confirmation email' do
    let(:user) { create(:user) }
    let(:mail) { ConfirmationMailer.confirmation_email(user) }
    let(:token) { FFaker::Guid.guid }

    before do
      allow(Auth::Token::ResetPassword).to receive(:generate).and_return(token)
    end

    it 'renders the headers' do
      expect(mail.to).to eq([user.email])
    end
  end
end
