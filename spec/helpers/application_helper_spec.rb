require 'rails_helper'

RSpec.describe ApplicationHelper do
  describe '#destroy_admin_user_session_path' do
    it { expect(helper.destroy_admin_user_session_path).to be_a(String) }
  end
end
