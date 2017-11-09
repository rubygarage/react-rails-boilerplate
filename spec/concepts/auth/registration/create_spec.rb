require "spec_helper"
require_relative "../../../../app/concepts/auth/registration/operation/create"

RSpec.describe Auth::Registration::Create do
  it do
    result = Auth::Registration::Create.({ happy: 'yes' })
    expect( result.success? ).to be_truthy
  end
end
