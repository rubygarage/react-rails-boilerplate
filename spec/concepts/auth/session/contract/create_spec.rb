require 'rails_helper'

RSpec.describe Auth::Session::Contract::Create do
  subject { described_class.new(user) }
  let(:missed_params) { Hash.new }
  let(:valid_params) { { username: user.username, password: user.password } }
  let(:invalid_params) { { username: user.username, password: 'fake password' } }
  let!(:user) { FactoryGirl.create(:user) }

  describe 'validations' do
    it 'success' do
      expect(subject.validate(valid_params)).to eq true
    end

    it 'fail on empty fields' do
      expect(subject.validate(missed_params)).to eq false
      subject.errors[:username].include? 'must be filled'
      subject.errors[:password].include? 'must be filled'
    end

    it 'fail on fake password' do
      expect(subject.validate(invalid_params)).to eq false
      subject.errors[:username].include? 'invalid credentials'
    end
  end
end
