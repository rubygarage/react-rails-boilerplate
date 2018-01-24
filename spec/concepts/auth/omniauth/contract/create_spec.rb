RSpec.describe Auth::Omniauth::Contract::Create do
  describe 'user registration' do
    let(:user) { build(:user, :facebook_provider) }
    let(:missed_params) { user.attributes.slice 'uid', 'provider' }

    context 'new user' do
      let(:subject) { described_class.new(user) }

      it 'validates user params' do
        expect(subject.valid?).to eq true
      end

      it 'fails on missed params' do
        subject = described_class.new(User.new)

        expect(subject.validate(missed_params)).to eq false
        expect(subject.errors[:username]).to include 'must be filled'
        expect(subject.errors[:email]).to include 'must be filled'
      end

      it 'passes on allowed providers' do
        expect(subject.errors[:provider]).to be_empty
      end

      it 'fails on unpermitted provider' do
        user_with_unpermitted_provider = build(:user, provider: 'unpermited_provider')
        subject = described_class.new(user_with_unpermitted_provider)
        subject.validate(user_with_unpermitted_provider.attributes)

        expect(subject.errors[:provider]).to include 'is not permitted'
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
