module ConsumerProfileDomain


  class ConsumerProfile < Model
    has_one :avatar
    has_many :orders
  end

  class Avatar < Model
  end



  class ConsumerProfileRepository
    def find(id)
      ConsumerProfile.find(id)
      #code
    end

    def find_with_avatar(id)
      ConsumerProfile.includes(:avatar).find(id)
      #code
    end

    def find_with_orders(id)
      consumer = ConsumerProfile.find(id)
      consumer.orders = OrderDomain::Models::Order.where(customer_id: id)
    end
  end


  class GetUserWithOrders

    def first_way(user_id)
      consumer = ConsumerProfileRepository.find(user_id)
      consumer.orders = OrderDomain::Usecases::GetOrdersByUser.call(user_id)
    end

    def second_way(user_id)
      ConsumerProfileRepository.find_with_orders(user_id)
    end
  end


end
