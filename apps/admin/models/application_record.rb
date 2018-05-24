module Admin
  module Models
    class ApplicationRecord < ::ApplicationRecord
      self.abstract_class = true
    end
  end
end
