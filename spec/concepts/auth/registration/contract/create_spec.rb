require 'rails_helper'

RSpec.describe Auth::Registration::Contract::Create do

  let(:missed_params) { { username: user.username, password: user.password } }
  let(:subject) { described_class.new(User.new) }
  let(:user) { build(:user) }
  let(:valid_params) {
    {
      username: user.username,
      password: user.password,
      password_confirmation: user.password,
      email: user.email
    }
  }

  describe 'registrate new user' do
    it 'validate user params' do
      expect(subject.validate(valid_params)).to eq true
    end

    it 'fail on missed params' do
      expect(subject.validate(missed_params)).to eq false
      expect(subject.errors[:password_confirmation]).to include "doesn't match"
      expect(subject.errors[:email]).to include 'must be filled'
    end

    context 'persisted user' do
      let!(:persisted_user) { create(:user) }
      before { subject.validate({ username: persisted_user.username, email: persisted_user.email }) }

      it 'fail on email' do
        expect(subject.errors[:email]).to include 'is not unique'
      end

      it 'fail on username' do
        expect(subject.errors[:username]).to include 'is not unique'
      end
    end
  end
end
