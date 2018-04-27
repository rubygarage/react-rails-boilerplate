class ErrorSerializer < ApplicationSerializer
  set_key_transform :camel_lower

  def serializable_hash
    errors = @resource.errors.messages.flat_map do |attribute_name, attribute_errors|
      attribute_name = self.class.run_key_transform(attribute_name)
      attribute_error_objects(attribute_name, attribute_errors)
    end

    { errors: errors }
  end

  private

  def attribute_error_objects(attribute_name, attribute_errors)
    attribute_errors.map do |error|
      { source: error_source(attribute_name), detail: error }
    end
  end

  def error_source(name)
    { pointer: "/data/attributes/#{name}" }
  end
end
