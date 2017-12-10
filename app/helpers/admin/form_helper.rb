module Admin
  module FormHelper
    def copy_errors_to_resource(form, resource)
      error_keys = form.errors.messages.keys

      error_keys.each do |error_key|
        error_messages = form.errors.messages[error_key]
        error_messages.each {|message| resource.errors.add(error_key, message)}
      end
    end
  end
end
