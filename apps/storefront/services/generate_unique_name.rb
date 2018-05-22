class GenerateUniqueName
  POSTFIX = 2

  def initialize(username, taken_names, count = POSTFIX)
    @name = username
    @taken_names = taken_names
    @count = count
  end

  def call
    loop do
      new_name = "#{@name}_#{@count}"
      return new_name if @taken_names.exclude?(new_name)
      @count += 1
    end
  end
end
