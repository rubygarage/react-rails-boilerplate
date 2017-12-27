require 'rails_helper'

RSpec.describe Auth::Session::Contract::Create do
  subject { described_class.new(user) }
  let(:missed_params) { {} }
  let(:valid_params) { { username: user.username, password: user.password } }
  let(:invalid_params) { { username: user.username, password: 'fake password' } }
  let!(:user) { create(:user) }

  describe 'validations' do
    it 'success' do
      expect(subject.validate(valid_params)).to eq true
    end

    it 'fail on empty fields' do
      expect(subject.validate(missed_params)).to eq false
      %i(username password).each do |key|
        expect(subject.errors[key]).to include 'must be filled'
      end
    end

    it 'fail on fake password' do
      expect(subject.validate(invalid_params)).to eq false
      expect(subject.errors[:username]).to include 'invalid credentials'
    end
  end
end
