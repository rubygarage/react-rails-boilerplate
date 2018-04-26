require 'rails_helper'

RSpec.describe ConfirmationMailer, type: :mailer do
  describe 'confirmation email' do
    subject { ConfirmationMailer.confirmation_email(user) }

    let(:user) { create(:user) }

    it 'renders the headers' do
      expect(subject.to).to eq([user.email])
    end
  end
end
