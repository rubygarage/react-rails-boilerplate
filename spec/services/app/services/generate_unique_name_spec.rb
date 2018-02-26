RSpec.describe GenerateUniqueName do
  describe '#call' do
    let(:username) { 'Hoek' }
    let(:taken_names) { %w[Hoek_2 Hoek_3] }
    let(:subject) { GenerateUniqueName.new(username, taken_names) }

    it 'generates free name' do
      expect(subject.call).to eq 'Hoek_4'
    end
  end
end
