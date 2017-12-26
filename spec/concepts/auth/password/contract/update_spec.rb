require 'rails_helper'

RSpec.describe Auth::Password::Contract::Update do
  let(:params) { double('params') }
  let(:subject) { described_class.new(params) }

  describe 'password reset' do
    before do
      allow(params).to receive(:password) { '12345678' }
      allow(params).to receive(:password_confirmation) { '12345678' }
    end

    it 'set new password' do
      expect(subject.valid?).to eq true
    end

    it 'fail on unconfirmed password' do
      allow(params).to receive(:password_confirmation) { 'invalid_confirmation' }
      expect(subject.valid?).to eq false
    end
  end
end
