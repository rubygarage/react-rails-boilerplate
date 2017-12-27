require 'rails_helper'

RSpec.describe User::Show do
  let(:subject) { described_class.call(params) }
  let!(:user) { create(:user) }

  describe 'setup user' do
    let(:params) { { id: user.id } }

    context 'user exist' do
      it 'find by id' do
        expect(subject['model']).to eq user
      end

      it 'success' do
        expect(subject).to be_success
      end
    end

    context 'nonexistent user' do
      let(:params) { { id: nil } }

      it 'empty model' do
        expect(subject['model']).to be_nil
      end

      it 'fail' do
        expect(subject).to be_failure
      end
    end
  end
end
