RSpec.describe Admin::Auth::Session::Contract::Create do
  let(:subject) { described_class.new(admin) }
  let!(:admin) { create(:user, :admin) }

  describe 'validations' do
    context 'valid params' do
      let(:valid_params) { { username: admin.username, password: admin.password } }

      before do
        subject.validate(valid_params)
      end

      it 'is success' do
        expect(subject).to be_valid
        expect(subject.errors).to be_empty
      end
    end

    context 'empty params' do
      let(:empty_params) { {} }

      before do
        subject.validate(empty_params)
      end

      it 'fails with empty params' do
        expect(subject).not_to be_valid

        %i[username password].each do |key|
          expect(subject.errors[key]).to include 'must be filled'
        end
      end
    end

    context 'invalid params' do
      let(:invalid_params) { { username: admin.username, password: 'fake password' } }

      before do
        subject.validate(invalid_params)
      end

      it 'fails' do
        expect(subject).not_to be_valid
        expect(subject.errors[:username]).to include 'invalid credentials'
      end
    end
  end
end
