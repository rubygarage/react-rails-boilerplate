require 'rails_helper'

RSpec.describe Admin::Auth::Session::Contract::Create do
  let(:subject) { described_class.new(admin) }
  let!(:admin) { FactoryGirl.create(:user, :admin) }

  describe 'validations' do
    context 'valid params' do
      let(:valid_params) { { username: admin.username, password: admin.password } }

      before do
        subject.validate(valid_params)
      end

      it 'success' do
        expect(subject).to be_valid
      end

      it 'has no errors' do
        expect(subject.errors).to be_empty
      end
    end

    context 'missed params' do
      let(:missed_params) { Hash.new }

      before do
        subject.validate(missed_params)
      end

      it 'fail on empty fields' do
        expect(subject).not_to be_valid
      end

      it 'show errors' do
        expect(subject.errors[:username]).to include 'must be filled'
        expect(subject.errors[:password]).to include 'must be filled'
      end
    end

    context 'invalid params' do
      let(:invalid_params) { { username: admin.username, password: 'fake password' } }

      before do
        subject.validate(invalid_params)
      end

      it 'fail on fake password' do
        expect(subject).not_to be_valid
      end

      it 'show invalid credentials' do
        expect(subject.errors[:username]).to include 'invalid credentials'
      end
    end
  end
end
