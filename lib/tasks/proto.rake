# TODO: Fix it
namespace :proto do
  Rails.logger = Logger.new(STDOUT)

  desc 'Generate ruby-libs from the proto-files'
  task generate: :environment do
    proto_path = Rails.root.join('apps', 'auth', 'rpc', 'proto')
    lib_path = Rails.root.join('apps', 'auth', 'rpc', 'lib')

    Dir.glob(File.join(proto_path, '**', '*.proto')).each do |file|
      file_name = File.basename(file)

      Rails.logger.info "Processing #{file_name}"

      %x{ grpc_tools_ruby_protoc --proto_path=#{proto_path} --ruby_out=#{lib_path} --grpc_out=#{lib_path} #{file} }
    end
  end
end
