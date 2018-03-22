require 'rails_helper'

RSpec.describe ResetPasswordMailer, type: :mailer do
  describe 'reset instructions' do
    let(:user) { create(:user) }
    let(:mail) { ResetPasswordMailer.reset_instructions(user) }
    let(:token) { FFaker::Guid.guid }

    before do
      allow(Auth::Token::ResetPassword).to receive(:generate).and_return(token)
    end

    it 'renders the headers' do
      expect(mail.to).to eq([user.email])
    end

    it 'renders the token' do
      expect(mail.body.encoded).to include(token)
    end
  end
end
