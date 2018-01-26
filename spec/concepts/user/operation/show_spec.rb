RSpec.describe User::Show do
  let(:subject) { described_class.call(params, { 'current_user' => user}) }
  let!(:user) { create(:user) }
  let!(:other_user) { create(:user) }

  describe 'setup user' do
    let(:params) { { id: user.id } }

    context 'user exist' do
      it 'sets model as user' do
        expect(subject['model']).to eq user
        expect(subject).to be_success
      end
    end

    context 'nonexistent user' do
      let(:params) { { id: nil } }

      it 'does not set model' do
        expect(subject['model']).to be_nil
        expect(subject).to be_failure
      end
    end
  end

  describe 'other user' do
    let(:params) { { id: other_user.id } }

    it 'does not allow to access other user' do
      expect(subject['model']).to eq other_user
      expect(subject).to be_failure
    end
  end
end
