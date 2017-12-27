require 'rails_helper'

RSpec.describe Auth::Confirmation::Create do
  let!(:params) { {} }
  let(:subject) { described_class.call(params) }
  let!(:user) { create(:user) }

  describe 'confirmation' do
    context 'valid token' do
      before do
        allow(Auth::Token::EmailConfirmation).to receive(:user_by_token) { user }
      end

      it 'success' do
        expect(subject).to be_success
      end

      it 'setup model as existed user' do
        expect(subject['model']).to eq user
      end

      it 'mark as confirmed' do
        expect(subject['model']).to be_confirmed_at
      end
    end

    context 'invalid token' do
      before do
        allow(Auth::Token::EmailConfirmation).to receive(:user_by_token) { nil }
      end

      it 'fail' do
        expect(subject).to be_failure
      end

      it 'is not setup model' do
        expect(subject['model']).to be_nil
      end

      it 'is not mark as confirmed' do
        expect(subject['model']).not_to receive(:update)
      end
    end
  end
end
