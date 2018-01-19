RSpec.describe Auth::Omniauth::Contract::Create do
  describe 'user registration' do
    let(:user) { build(:user, :facebook_provider) }
    let(:valid_params) { user.attributes }
    let(:missed_params) { user.attributes.slice 'uid', 'provider' }

    context 'new user' do
      let(:subject) { described_class.new(User.new) }

      it 'validates user params' do
        expect(subject.validate(valid_params)).to eq true
      end

      it 'fails on missed params' do
        expect(subject.validate(missed_params)).to eq false
        expect(subject.errors[:username]).to include 'must be filled'
        expect(subject.errors[:email]).to include 'must be filled'
      end
    end

    context 'persisted user' do
      let!(:persisted_user) { build(:user, :facebook_provider) }
      let(:subject) { described_class.new(persisted_user) }
      before do
        persisted_user.save
      end

      it 'fails' do
        expect(subject.validate(persisted_user.attributes)).to be false
      end

      it 'sets errors' do
        subject.validate(persisted_user.attributes)
        expect(subject.errors[:uid]).to include 'is not unique'
      end
    end
  end
end
