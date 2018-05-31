module Catalogue
  module Repositories
    class ProductRepository
      class << self

        def find_by_id(id, query = available_products)
          result = query.includes(:variants, master: [:default_price])
                        .find_by(id: id)

          raise ActiveRecord::RecordNotFound unless result
          Catalogue::Aggregates::ProductAggregate.new(result)
        end

        def find_by_slug(slug, query = available_products)
          result = query.includes(:variants, master: [:default_price])
                        .find_by(permalink: slug)

          raise ActiveRecord::RecordNotFound unless result
          Catalogue::Aggregates::ProductAggregate.new(result)
        end

        def available_products_with_master_price(query = available_products)
          query.joins(master: [:default_price])
        end

        def filter_by_name(name, query = available_products)
          query.where('name LIKE :name', name: "%#{name}%")
        end

        def filter_by_price(min, max, query = available_products)
          query.joins(master: [:default_price])
               .where(Catalogue::Models::Price.table_name => { amount: min..max })
        end

        private

        def available_products
          Catalogue::Models::Product
            .where("available_on <= :current_date", current_date: Time.zone.now)
            .where(deleted_at: nil)
        end

      end
    end
  end
end
